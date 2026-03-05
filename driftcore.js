// driftcore.js

window.DriftCore = {
    // ==========================================
    // PHASE 1 & 1.3: ANALYTICS & FOCUS MATH
    // ==========================================
    calculateMetrics: function(courses, timeframe = 'week') {
        const now = new Date();
        const currentTimestamp = now.getTime();
        let startTimestamp = 0;

        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        if (timeframe === 'day') {
            startTimestamp = startOfDay;
        } else if (timeframe === 'week') {
            startTimestamp = startOfDay - (now.getDay() * 24 * 60 * 60 * 1000);
        } else if (timeframe === 'month') {
            startTimestamp = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        }

        const filteredCourses = courses.filter(c => {
            const timestamp = parseInt(c.id.split('_').pop()) || parseInt(c.id);
            return timestamp >= startTimestamp && timestamp <= currentTimestamp;
        });

        if (filteredCourses.length === 0) {
            return {
                completion: { pct: 0, raw: 0, total: 0 },
                overrun: { pct: 0, raw: 0, total: 0 },
                early: { pct: 0, raw: 0, total: 0 },
                focus: { pct: 0, rawScore: 0, rawTime: 0, sessions: 0 },
                hasData: false
            };
        }

        const completedCount = filteredCourses.filter(c => c.isCompleted).length;
        const completionPct = Math.round((completedCount / filteredCourses.length) * 100);

        const completedWithDuration = filteredCourses.filter(c => c.isCompleted && c.duration > 0);
        const overrunCount = completedWithDuration.filter(c => c.timeSpent > c.duration).length;
        const overrunPct = completedWithDuration.length > 0 ? Math.round((overrunCount / completedWithDuration.length) * 100) : 0;

        const earlyCount = filteredCourses.filter(c => c.startedEarly).length;
        const earlyPct = Math.round((earlyCount / filteredCourses.length) * 100);

        let totalFocusScore = 0;
        let validFocusSessions = 0;
        let totalRawTimeSpent = 0;

        filteredCourses.filter(c => c.timeSpent > 0).forEach(c => {
            totalRawTimeSpent += c.timeSpent;
            const minutes = c.timeSpent / 60;
            let score = 0;

            if (minutes > 0 && minutes <= 15) { score = 85; } 
            else if (minutes > 15 && minutes <= 60) { score = 100; } 
            else if (minutes > 60 && minutes <= 120) { score = 100 - ((minutes - 60) * 0.5); } 
            else if (minutes > 120) { score = 70; }

            totalFocusScore += score;
            validFocusSessions += 1;
        });

        const focusPct = validFocusSessions > 0 ? Math.round(totalFocusScore / validFocusSessions) : 0;

        return {
            completion: { pct: completionPct, raw: completedCount, total: filteredCourses.length },
            overrun: { pct: overrunPct, raw: overrunCount, total: completedWithDuration.length },
            early: { pct: earlyPct, raw: earlyCount, total: filteredCourses.length },
            focus: { pct: focusPct, rawScore: totalFocusScore, rawTime: totalRawTimeSpent, sessions: validFocusSessions },
            hasData: true
        };
    },

    generateCalendarData: function(courses, year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calendar = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            calendar.push({ date: dateStr, day: i, timeSpent: 0, coursesCompleted: 0 });
        }

        courses.forEach(c => {
            const timestamp = parseInt(c.id.split('_').pop()) || parseInt(c.id);
            const courseDate = new Date(timestamp);
            
            if (courseDate.getFullYear() === year && courseDate.getMonth() === month) {
                const dayIndex = courseDate.getDate() - 1; 
                if (calendar[dayIndex]) {
                    calendar[dayIndex].timeSpent += (c.timeSpent || 0);
                    if (c.isCompleted) calendar[dayIndex].coursesCompleted += 1;
                }
            }
        });

        calendar.forEach(day => {
            const minutes = day.timeSpent / 60;
            if (minutes === 0) day.intensity = 0;
            else if (minutes <= 15) day.intensity = 1; 
            else if (minutes <= 60) day.intensity = 2; 
            else if (minutes <= 120) day.intensity = 3; 
            else day.intensity = 4; 
        });

        return calendar;
    },

    // ==========================================
    // PHASE 1.4: CREW BONDS & EXP ECONOMY
    // ==========================================

    FRIENDSHIP_RANKS: [
        { min: 0, max: 99, name: "Stowaway", icon: "fas fa-box" },
        { min: 100, max: 499, name: "Deckhand", icon: "fas fa-anchor" },
        { min: 500, max: 1499, name: "Trusted Mate", icon: "fas fa-handshake" },
        { min: 1500, max: 3999, name: "Co-Captain", icon: "fas fa-dharmachakra" },
        { min: 4000, max: Infinity, name: "Soulbound", icon: "fas fa-infinity" }
    ],

    getFriendshipRank: function(exp) {
        const safeExp = exp || 0;
        return this.FRIENDSHIP_RANKS.find(r => safeExp >= r.min && safeExp <= r.max) || this.FRIENDSHIP_RANKS[0];
    },

    getCoopMultiplier: function(streakDays) {
        if (!streakDays || streakDays < 1) return 1.0;
        if (streakDays >= 7) return 1.5;
        if (streakDays >= 3) return 1.2;
        return 1.1;
    },

    calculateSessionExp: function(timeSpentSeconds, isLiveCoop, isGhostCoop, streakDays) {
        const minutes = Math.floor(timeSpentSeconds / 60);
        if (minutes < 1) return 0; // Prevent farming
        
        const baseExp = minutes * 10;
        const multiplier = this.getCoopMultiplier(streakDays);
        
        if (isLiveCoop) {
            return Math.floor(baseExp * multiplier); // Full EXP for Live Co-op
        } else if (isGhostCoop) {
            return Math.floor((baseExp * multiplier) * 0.5); // 50% EXP for Ghost Co-op
        }
        return 0; 
    },

    calculateGhostProgress: function(ghostSessionData, localStartTime) {
        if (!ghostSessionData || !ghostSessionData.durationSeconds) return 0;
        
        const now = Date.now();
        const elapsedSecs = Math.floor((now - localStartTime) / 1000);
        const targetSecs = ghostSessionData.durationSeconds;

        if (elapsedSecs >= targetSecs) return 100;
        return Math.floor((elapsedSecs / targetSecs) * 100);
    }
};
// driftcore.js

window.DriftCore = {
    // ==========================================
    // PHASE 1: ANALYTICS & FOCUS MATH
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
            const hours = day.timeSpent / 3600;
            if (hours === 0) day.intensity = 0;
            else if (hours <= 0.5) day.intensity = 1;
            else if (hours <= 2.0) day.intensity = 2;
            else if (hours <= 4.0) day.intensity = 3;
            else day.intensity = 4; 
        });

        return calendar;
    },

    // ==========================================
    // PHASE 1.2: CO-OP & GHOST MULTIPLIERS
    // ==========================================

    /**
     * Calculates the EXP multiplier based on consecutive days studied together.
     * Rewards consistency but caps at 1.5x to prevent economy inflation.
     */
    getCoopMultiplier: function(streakDays) {
        if (!streakDays || streakDays < 1) return 1.0;
        if (streakDays >= 7) return 1.5;
        if (streakDays >= 3) return 1.2;
        return 1.1;
    },

    /**
     * Calculates base EXP earned for a session, factoring in co-op presence.
     * E.g., 10 EXP per focused minute.
     */
    calculateSessionExp: function(timeSpentSeconds, isCoop, streakDays) {
        const minutes = Math.floor(timeSpentSeconds / 60);
        if (minutes < 1) return 0; // Prevent farming sub-minute sessions
        
        const baseExp = minutes * 10;
        const multiplier = isCoop ? this.getCoopMultiplier(streakDays) : 1.0;
        
        return Math.floor(baseExp * multiplier);
    },

    /**
     * STRICT UI RULE COMPLIANCE: 
     * Calculates Ghost Progress without exposing the Ghost's raw duration.
     * Returns a clean 0 to 100 percentage based on when the local user started tracking it.
     */
    calculateGhostProgress: function(ghostSessionData, localStartTime) {
        if (!ghostSessionData || !ghostSessionData.durationSeconds) return 0;
        
        const now = Date.now();
        const elapsedSecs = Math.floor((now - localStartTime) / 1000);
        const targetSecs = ghostSessionData.durationSeconds;

        if (elapsedSecs >= targetSecs) return 100;
        return Math.floor((elapsedSecs / targetSecs) * 100);
    }
};
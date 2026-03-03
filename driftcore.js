// driftcore.js

window.DriftCore = {
    /**
     * FEATURE 1.1.1: Upgraded Metrics Engine
     * Calculates data dynamically based on timeframe (day/week/month)
     * Returns BOTH raw numbers and percentages for UI toggling.
     */
    calculateMetrics: function(courses, timeframe = 'week') {
        const now = new Date();
        const currentTimestamp = now.getTime();
        let startTimestamp = 0;

        // Determine boundaries
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        if (timeframe === 'day') {
            startTimestamp = startOfDay;
        } else if (timeframe === 'week') {
            // Start of current week (assuming Sunday start)
            startTimestamp = startOfDay - (now.getDay() * 24 * 60 * 60 * 1000);
        } else if (timeframe === 'month') {
            // Start of current month
            startTimestamp = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        }

        // Filter for items created within the selected timeframe
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

        // 1. Completion
        const completedCount = filteredCourses.filter(c => c.isCompleted).length;
        const completionPct = Math.round((completedCount / filteredCourses.length) * 100);

        // 2. Overrun
        const completedWithDuration = filteredCourses.filter(c => c.isCompleted && c.duration > 0);
        const overrunCount = completedWithDuration.filter(c => c.timeSpent > c.duration).length;
        const overrunPct = completedWithDuration.length > 0 ? Math.round((overrunCount / completedWithDuration.length) * 100) : 0;

        // 3. Proactivity
        const earlyCount = filteredCourses.filter(c => c.startedEarly).length;
        const earlyPct = Math.round((earlyCount / filteredCourses.length) * 100);

        // 4. Focus & Raw Time
        let totalFocusScore = 0;
        let validFocusSessions = 0;
        let totalRawTimeSpent = 0;

        filteredCourses.filter(c => c.timeSpent > 0).forEach(c => {
            totalRawTimeSpent += c.timeSpent;
            const minutes = c.timeSpent / 60;
            let score = 0;

            if (minutes > 0 && minutes <= 15) {
                score = 85; 
            } else if (minutes > 15 && minutes <= 60) {
                score = 100; 
            } else if (minutes > 60 && minutes <= 120) {
                score = 100 - ((minutes - 60) * 0.5); 
            } else if (minutes > 120) {
                score = 70; 
            }

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

    /**
     * FEATURE 1.1.1: Calendar Heatmap Generator
     * Maps tasks to days of the month and assigns an intensity score.
     */
    generateCalendarData: function(courses, year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calendar = [];

        // Setup the blank calendar grid
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            calendar.push({
                date: dateStr,
                day: i,
                timeSpent: 0,
                coursesCompleted: 0
            });
        }

        // Drop the task data into the correct days
        courses.forEach(c => {
            const timestamp = parseInt(c.id.split('_').pop()) || parseInt(c.id);
            const courseDate = new Date(timestamp);
            
            if (courseDate.getFullYear() === year && courseDate.getMonth() === month) {
                const dayIndex = courseDate.getDate() - 1; // Arrays start at 0
                if (calendar[dayIndex]) {
                    calendar[dayIndex].timeSpent += (c.timeSpent || 0);
                    if (c.isCompleted) {
                        calendar[dayIndex].coursesCompleted += 1;
                    }
                }
            }
        });

        // Calculate Heatmap Intensity (0 to 4) based on hours studied
        calendar.forEach(day => {
            const hours = day.timeSpent / 3600;
            if (hours === 0) day.intensity = 0;
            else if (hours <= 0.5) day.intensity = 1; // Light
            else if (hours <= 2.0) day.intensity = 2; // Medium
            else if (hours <= 4.0) day.intensity = 3; // Heavy
            else day.intensity = 4; // Max
        });

        return calendar;
    }
};
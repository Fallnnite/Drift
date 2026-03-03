// drift-core.js

window.DriftCore = {
    /**
     * FEATURE 2: Quality Metrics Aggregation & Focus Algorithm
     * Aggregates weekly data strictly into percentages to prevent toxic raw-number comparison.
     */
    calculateWeeklyMetrics: function(courses) {
        const now = Date.now();
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

        // Filter for items from the last 7 days using their ID timestamp
        const weeklyCourses = courses.filter(c => {
            // IDs are usually formatted like '1678901234' or 'uid_1678901234'
            const timestamp = parseInt(c.id.split('_').pop()) || parseInt(c.id);
            return timestamp >= oneWeekAgo && timestamp <= now;
        });

        if (weeklyCourses.length === 0) {
            return { completion: 0, overrun: 0, early: 0, focus: 0, hasData: false };
        }

        // 1. Task Completion % (Completed vs Total Planned)
        const completedCount = weeklyCourses.filter(c => c.isCompleted).length;
        const completionPct = Math.round((completedCount / weeklyCourses.length) * 100);

        // 2. Overrun % (Tasks that went into overtime)
        const completedWithDuration = weeklyCourses.filter(c => c.isCompleted && c.duration > 0);
        const overrunCount = completedWithDuration.filter(c => c.timeSpent > c.duration).length;
        const overrunPct = completedWithDuration.length > 0 ? Math.round((overrunCount / completedWithDuration.length) * 100) : 0;

        // 3. Proactivity % (Tasks started ahead of their scheduled lock time)
        const earlyCount = weeklyCourses.filter(c => c.startedEarly).length;
        const earlyPct = Math.round((earlyCount / weeklyCourses.length) * 100);

        // 4. Focus Ratio Algorithm
        // Rewards 15-60 min Pomodoro blocks. Smoothly degrading curve for dangerously long unbroken blocks.
        let totalFocusScore = 0;
        let validFocusSessions = 0;

        weeklyCourses.filter(c => c.timeSpent > 0).forEach(c => {
            const minutes = c.timeSpent / 60;
            let score = 0;

            if (minutes > 0 && minutes <= 15) {
                // Warmup phase: good, but not quite deep flow
                score = 85; 
            } else if (minutes > 15 && minutes <= 60) {
                // Optimal Flow State: 100% Quality
                score = 100; 
            } else if (minutes > 60 && minutes <= 120) {
                // Gently degrades from 100 down to 70 over the course of the second hour.
                // Encourages taking a break without actively punishing the user.
                score = 100 - ((minutes - 60) * 0.5); 
            } else if (minutes > 120) {
                // Flatlines at 70%. Does not drop further to avoid destroying morale, 
                // but strictly removes the incentive to study 4 hours straight.
                score = 70; 
            }

            totalFocusScore += score;
            validFocusSessions += 1;
        });

        const focusPct = validFocusSessions > 0 ? Math.round(totalFocusScore / validFocusSessions) : 0;

        return {
            completion: completionPct,
            overrun: overrunPct,
            early: earlyPct,
            focus: focusPct,
            hasData: true
        };
    }
};
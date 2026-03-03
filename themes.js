// themes.js

const THEMES = {
    // --- THE ORIGINALS ---
    koi: { 
        id: 'koi', name: 'Ocean & Goldfish', 
        bgMain: 'bg-orange-500', bgHover: 'hover:bg-orange-600', bgLight: 'bg-orange-50', 
        textMain: 'text-orange-600', textLight: 'text-orange-100', 
        borderMain: 'border-orange-200', borderHover: 'hover:border-orange-300', borderFocus: 'focus:border-orange-400', 
        ringActive: 'ring-orange-100', ringFocus: 'focus:ring-orange-100', 
        shadowIcon: 'shadow-orange-200', shadowBtn: 'shadow-orange-500/30', 
        gradient: 'from-blue-500 via-sky-400 to-orange-400', 
        sidebarGradient: 'from-sky-700 via-blue-600 to-orange-500', 
        waveColorClass: 'text-orange-100', patternClass: 'pattern-koi' 
    },
    navy: { 
        id: 'navy', name: 'Deep Sea Grid', 
        bgMain: 'bg-slate-700', bgHover: 'hover:bg-slate-800', bgLight: 'bg-slate-100', 
        textMain: 'text-slate-700', textLight: 'text-slate-200', 
        borderMain: 'border-slate-300', borderHover: 'hover:border-slate-400', borderFocus: 'focus:border-slate-500', 
        ringActive: 'ring-slate-200', ringFocus: 'focus:ring-slate-200', 
        shadowIcon: 'shadow-slate-300', shadowBtn: 'shadow-slate-700/30', 
        gradient: 'from-slate-600 via-slate-700 to-slate-900', 
        sidebarGradient: 'from-slate-700 via-slate-800 to-slate-950', 
        waveColorClass: 'text-slate-200', patternClass: 'pattern-navy' 
    },

    // --- MULTI-COLOR MARINE THEMES ---
    bioluminescent: { 
        id: 'bioluminescent', name: 'Neon Abyss', 
        bgMain: 'bg-fuchsia-500', bgHover: 'hover:bg-fuchsia-600', bgLight: 'bg-cyan-50', 
        textMain: 'text-purple-600', textLight: 'text-cyan-100', 
        borderMain: 'border-cyan-200', borderHover: 'hover:border-cyan-300', borderFocus: 'focus:border-fuchsia-400', 
        ringActive: 'ring-fuchsia-200', ringFocus: 'focus:ring-fuchsia-200', 
        shadowIcon: 'shadow-purple-200', shadowBtn: 'shadow-fuchsia-500/30', 
        gradient: 'from-purple-800 via-fuchsia-500 to-cyan-400', 
        sidebarGradient: 'from-slate-950 via-purple-900 to-fuchsia-700', 
        waveColorClass: 'text-fuchsia-100', patternClass: 'pattern-lavender' 
    },
    reef: { 
        id: 'reef', name: 'Tropical Reef', 
        bgMain: 'bg-teal-500', bgHover: 'hover:bg-teal-600', bgLight: 'bg-rose-50', 
        textMain: 'text-rose-500', textLight: 'text-teal-100', 
        borderMain: 'border-rose-200', borderHover: 'hover:border-rose-300', borderFocus: 'focus:border-teal-400', 
        ringActive: 'ring-teal-200', ringFocus: 'focus:ring-teal-200', 
        shadowIcon: 'shadow-rose-200', shadowBtn: 'shadow-teal-500/30', 
        gradient: 'from-teal-500 via-emerald-400 to-rose-400', 
        sidebarGradient: 'from-teal-800 via-teal-600 to-rose-500', 
        waveColorClass: 'text-teal-100', patternClass: 'pattern-mint' 
    },
    sunset: { 
        id: 'sunset', name: 'Sunset Sail', 
        bgMain: 'bg-indigo-600', bgHover: 'hover:bg-indigo-700', bgLight: 'bg-amber-50', 
        textMain: 'text-amber-600', textLight: 'text-indigo-100', 
        borderMain: 'border-amber-200', borderHover: 'hover:border-amber-300', borderFocus: 'focus:border-indigo-400', 
        ringActive: 'ring-indigo-200', ringFocus: 'focus:ring-indigo-200', 
        shadowIcon: 'shadow-amber-200', shadowBtn: 'shadow-indigo-600/30', 
        gradient: 'from-indigo-700 via-purple-500 to-amber-400', 
        sidebarGradient: 'from-indigo-950 via-indigo-800 to-amber-600', 
        waveColorClass: 'text-indigo-100', patternClass: 'pattern-coral' 
    },

    // --- SLEEK / MINIMALIST THEMES (NO WAVES, NO PATTERNS) ---
    obsidian: { 
        id: 'obsidian', name: 'Sleek Obsidian', 
        bgMain: 'bg-black', bgHover: 'hover:bg-zinc-800', bgLight: 'bg-zinc-100', 
        textMain: 'text-black', textLight: 'text-zinc-400', 
        borderMain: 'border-zinc-200', borderHover: 'hover:border-zinc-300', borderFocus: 'focus:border-black', 
        ringActive: 'ring-zinc-200', ringFocus: 'focus:ring-zinc-200', 
        shadowIcon: 'shadow-zinc-200', shadowBtn: 'shadow-black/20', 
        gradient: 'from-black via-zinc-900 to-zinc-800', 
        sidebarGradient: 'from-black via-zinc-900 to-black', 
        waveColorClass: 'hidden', patternClass: 'bg-white' 
    },
    glacier: { 
        id: 'glacier', name: 'Sleek Glacier', 
        bgMain: 'bg-zinc-400', bgHover: 'hover:bg-zinc-500', bgLight: 'bg-slate-50', 
        textMain: 'text-zinc-500', textLight: 'text-white', 
        borderMain: 'border-slate-200', borderHover: 'hover:border-slate-300', borderFocus: 'focus:border-zinc-400', 
        ringActive: 'ring-zinc-100', ringFocus: 'focus:ring-zinc-100', 
        shadowIcon: 'shadow-zinc-200', shadowBtn: 'shadow-zinc-400/20', 
        gradient: 'from-zinc-200 via-zinc-300 to-zinc-400', 
        sidebarGradient: 'from-zinc-600 via-zinc-500 to-zinc-400', 
        waveColorClass: 'hidden', patternClass: 'bg-white' 
    }
};
// themes.js

const THEMES = {
    // --- THE SURVIVORS ---
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

    // --- THE NEW FLEET ---
    nautilus: { 
        id: 'nautilus', name: 'The Nautilus', 
        bgMain: 'bg-emerald-600', bgHover: 'hover:bg-emerald-700', bgLight: 'bg-emerald-50', 
        textMain: 'text-emerald-700', textLight: 'text-emerald-100', 
        borderMain: 'border-emerald-200', borderHover: 'hover:border-emerald-300', borderFocus: 'focus:border-emerald-500', 
        ringActive: 'ring-emerald-200', ringFocus: 'focus:ring-emerald-200', 
        shadowIcon: 'shadow-emerald-200', shadowBtn: 'shadow-emerald-600/30', 
        gradient: 'from-teal-800 via-emerald-600 to-amber-500', 
        sidebarGradient: 'from-slate-900 via-teal-900 to-emerald-800', 
        waveColorClass: 'text-emerald-100', patternClass: 'pattern-mint' 
    },
    kraken: { 
        id: 'kraken', name: 'Crimson Kraken', 
        bgMain: 'bg-rose-600', bgHover: 'hover:bg-rose-700', bgLight: 'bg-rose-50', 
        textMain: 'text-rose-600', textLight: 'text-rose-100', 
        borderMain: 'border-rose-200', borderHover: 'hover:border-rose-300', borderFocus: 'focus:border-rose-500', 
        ringActive: 'ring-rose-200', ringFocus: 'focus:ring-rose-200', 
        shadowIcon: 'shadow-rose-200', shadowBtn: 'shadow-rose-600/30', 
        gradient: 'from-slate-800 via-rose-700 to-red-500', 
        sidebarGradient: 'from-slate-950 via-slate-900 to-rose-900', 
        waveColorClass: 'text-rose-100', patternClass: 'pattern-coral' 
    },
    endeavour: { 
        id: 'endeavour', name: 'HMS Endeavour', 
        bgMain: 'bg-blue-600', bgHover: 'hover:bg-blue-700', bgLight: 'bg-blue-50', 
        textMain: 'text-blue-700', textLight: 'text-blue-100', 
        borderMain: 'border-blue-200', borderHover: 'hover:border-blue-300', borderFocus: 'focus:border-blue-500', 
        ringActive: 'ring-blue-200', ringFocus: 'focus:ring-blue-200', 
        shadowIcon: 'shadow-blue-200', shadowBtn: 'shadow-blue-600/30', 
        gradient: 'from-blue-900 via-blue-700 to-amber-400', 
        sidebarGradient: 'from-slate-900 via-blue-900 to-blue-700', 
        waveColorClass: 'text-blue-100', patternClass: 'pattern-ocean' 
    },
    bioluminescent: { 
        id: 'bioluminescent', name: 'Bioluminescent', 
        bgMain: 'bg-fuchsia-500', bgHover: 'hover:bg-fuchsia-600', bgLight: 'bg-fuchsia-50', 
        textMain: 'text-fuchsia-600', textLight: 'text-fuchsia-100', 
        borderMain: 'border-fuchsia-200', borderHover: 'hover:border-fuchsia-300', borderFocus: 'focus:border-fuchsia-500', 
        ringActive: 'ring-fuchsia-200', ringFocus: 'focus:ring-fuchsia-200', 
        shadowIcon: 'shadow-fuchsia-200', shadowBtn: 'shadow-fuchsia-500/30', 
        gradient: 'from-indigo-900 via-purple-600 to-fuchsia-400', 
        sidebarGradient: 'from-indigo-950 via-indigo-900 to-purple-800', 
        waveColorClass: 'text-fuchsia-100', patternClass: 'pattern-lavender' 
    },
    dutchman: { 
        id: 'dutchman', name: 'Flying Dutchman', 
        bgMain: 'bg-teal-500', bgHover: 'hover:bg-teal-600', bgLight: 'bg-teal-50', 
        textMain: 'text-teal-700', textLight: 'text-teal-100', 
        borderMain: 'border-teal-200', borderHover: 'hover:border-teal-300', borderFocus: 'focus:border-teal-500', 
        ringActive: 'ring-teal-200', ringFocus: 'focus:ring-teal-200', 
        shadowIcon: 'shadow-teal-200', shadowBtn: 'shadow-teal-500/30', 
        gradient: 'from-slate-600 via-teal-600 to-emerald-300', 
        sidebarGradient: 'from-slate-800 via-slate-700 to-teal-800', 
        waveColorClass: 'text-teal-100', patternClass: 'pattern-navy' 
    },

    // --- THE MINIMALIST FLEET (CLEAN & SLEEK) ---
    seasalt: { 
        id: 'seasalt', name: 'Sea Salt', 
        bgMain: 'bg-zinc-700', bgHover: 'hover:bg-zinc-800', bgLight: 'bg-zinc-100', 
        textMain: 'text-zinc-700', textLight: 'text-zinc-200', 
        borderMain: 'border-zinc-200', borderHover: 'hover:border-zinc-300', borderFocus: 'focus:border-zinc-400', 
        ringActive: 'ring-zinc-200', ringFocus: 'focus:ring-zinc-200', 
        shadowIcon: 'shadow-zinc-200', shadowBtn: 'shadow-zinc-700/20', 
        gradient: 'from-zinc-500 via-zinc-600 to-zinc-700', 
        sidebarGradient: 'from-zinc-800 via-zinc-900 to-black', 
        waveColorClass: 'text-zinc-200', patternClass: 'pattern-navy' 
    },
    morningfog: { 
        id: 'morningfog', name: 'Morning Fog', 
        bgMain: 'bg-slate-400', bgHover: 'hover:bg-slate-500', bgLight: 'bg-slate-100', 
        textMain: 'text-slate-500', textLight: 'text-slate-50', 
        borderMain: 'border-slate-200', borderHover: 'hover:border-slate-300', borderFocus: 'focus:border-slate-400', 
        ringActive: 'ring-slate-100', ringFocus: 'focus:ring-slate-100', 
        shadowIcon: 'shadow-slate-200', shadowBtn: 'shadow-slate-400/20', 
        gradient: 'from-slate-400 via-slate-500 to-slate-600', 
        sidebarGradient: 'from-slate-500 via-slate-600 to-slate-700', 
        waveColorClass: 'text-slate-200', patternClass: 'pattern-ocean' 
    }
};
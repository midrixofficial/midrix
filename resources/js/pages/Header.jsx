import {
    Menu,
    Moon,
    Sun,
    Search,
    Bell,
    ChevronRight,
} from "lucide-react";

function Header({ selectedMenu, darkMode, setDarkMode, onMenuClick }) {
    return (
        <header className="sticky top-0 z-30 border-b border-[#e4e7ec] bg-white dark:border-slate-800 dark:bg-[#1a2231] px-5 py-3.5">
            <div className="flex w-full items-center justify-between gap-4">
                {/* Left: Mobile menu + Breadcrumb */}
                <div className="flex items-center gap-3 min-w-0">
                    <button
                        className="rounded-lg border border-[#e4e7ec] p-2 text-[#667085] hover:bg-[#f2f4f7] dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={17} />
                    </button>

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-sm">
                        <span className="text-[#98a2b3] dark:text-slate-500 font-medium">Main Menu</span>
                        <ChevronRight size={14} className="text-[#d0d5dd] dark:text-slate-600 flex-shrink-0" />
                        <span className="font-semibold text-[#1a2231] dark:text-white">{selectedMenu}</span>
                    </nav>
                </div>

                {/* Right: Search + actions */}
                <div className="flex items-center gap-2.5">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 rounded-xl border border-[#e4e7ec] bg-[#f9fafb] dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-sm text-[#98a2b3]">
                        <Search size={15} />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="bg-transparent outline-none placeholder-[#98a2b3] text-[#1a2231] dark:text-white w-40 text-sm"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4e7ec] bg-white hover:bg-[#f2f4f7] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                        <Bell size={17} className="text-[#667085] dark:text-slate-400" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>

                    {/* Dark mode toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4e7ec] bg-white hover:bg-[#f2f4f7] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                        {darkMode ? (
                            <Sun className="text-yellow-400" size={17} />
                        ) : (
                            <Moon className="text-[#667085]" size={17} />
                        )}
                    </button>

                    {/* Avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a2231] dark:bg-white text-white dark:text-[#1a2231] text-sm font-semibold shadow-sm flex-shrink-0 cursor-pointer">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

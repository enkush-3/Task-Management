import { useState, useEffect } from 'react';

export default function TopBar({
    pageTitle,
    taskCount,
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange,
    onNewTask,
    canCreateTask,
    sortOption,
    setSortOption,
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    setCurrentPage,
    filters,
    setFilter,
}) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => {
            setFilterOpen(false);
            setSortOpen(false);
        };

        if (filterOpen || sortOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [filterOpen, sortOpen]);

    return (
        <header className="bg-white border-b border-primary-100 sticky top-0 z-20 backdrop-blur-sm bg-white/90">
            <div className="px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-primary-900 tracking-tight">
                        {pageTitle}
                    </h2>
                    <p className="text-sm text-primary-500 mt-0.5 font-medium">
                        {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <svg
                            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 group-focus-within:text-primary-600 transition-colors"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Хайх..."
                            value={searchQuery}
                            onChange={e => onSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-900 placeholder:text-primary-300 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none w-full transition-all"
                        />
                    </div>

                    <div className="flex bg-primary-50 border border-primary-200 rounded-lg p-1">
                        {['list', 'board'].map(mode => (
                            <button
                                key={mode}
                                onClick={() => onViewModeChange(mode)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                                    viewMode === mode
                                        ? 'bg-white text-primary-700 shadow-sm ring-1 ring-primary-200'
                                        : 'text-primary-500 hover:text-primary-700 hover:bg-primary-100/50'
                                }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-8 py-4 border-t border-primary-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
                    <div className="relative">
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setFilterOpen(!filterOpen);
                                setSortOpen(false);
                            }}
                            className={`flex items-center gap-1.5 text-sm transition-colors ${
                                filterOpen 
                                    ? 'text-primary-700 bg-primary-50 px-2 py-1 rounded-lg' 
                                    : 'text-primary-500 hover:text-primary-700'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span>Filter</span>
                            {filterOpen && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                        </button>
                        
                        {filterOpen && (
                            <div 
                                className="absolute top-full left-0 mt-2 w-64 bg-white border border-primary-200 rounded-xl shadow-xl p-4 z-200 animate-scale-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-medium text-primary-900 mb-1.5">Priority</p>
                                        <select
                                            value={filters.priority}
                                            onChange={e => {
                                                setFilter('priority', e.target.value);
                                                setFilterOpen(false);
                                            }}
                                            className="w-full bg-primary-50 text-primary-900 text-sm border border-primary-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                        >
                                            <option value="all">Бүгд</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-primary-900 mb-1.5">Status</p>
                                        <select
                                            value={filters.status}
                                            onChange={e => {
                                                setFilter('status', e.target.value);
                                                setFilterOpen(false);
                                            }}
                                            className="w-full bg-primary-50 text-primary-900 text-sm border border-primary-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                        >
                                            <option value="all">Бүгд</option>
                                            <option value="To do">To do</option>
                                            <option value="In progress">In progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSortOpen(!sortOpen);
                                setFilterOpen(false);
                            }}
                            className={`flex items-center gap-1.5 text-sm transition-colors ${
                                sortOpen 
                                    ? 'text-primary-700 bg-primary-50 px-2 py-1 rounded-lg' 
                                    : 'text-primary-500 hover:text-primary-700'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4V18" />
                            </svg>
                            <span>Sort</span>
                            {sortOpen && (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                        </button>
                        
                        {sortOpen && (
                            <div 
                                className="absolute top-full left-0 mt-2 w-48 bg-white border border-primary-200 rounded-xl shadow-xl p-4 z-200 animate-scale-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="space-y-2">
                                    {[
                                        { value: 'newest', label: 'Шинээс хуучин' },
                                        { value: 'oldest', label: 'Хуучинаас шинэ' },
                                        { value: 'priority', label: 'Priority-р' },
                                        { value: 'deadline', label: 'Deadline-р' }
                                    ].map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => {
                                                setSortOption(option.value);
                                                setSortOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                sortOption === option.value
                                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                                    : 'text-primary-600 hover:bg-primary-50'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={onNewTask}
                    disabled={!canCreateTask}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Шинэ Task
                </button>
            </div>
        </header>
    );
}
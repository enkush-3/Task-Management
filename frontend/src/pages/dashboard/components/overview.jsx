import { useMemo } from 'react';

export default function DashboardOverview({ tasks, workspaces, onTaskClick }) {
    const stats = useMemo(() => {
        const now = new Date();
        const today = now.toDateString();
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const inProgress = tasks.filter(t => t.status === 'In progress').length;
        const todo = tasks.filter(t => t.status === 'To do').length;
        
        const overdue = tasks.filter(t => 
            t.endAt && new Date(t.endAt) < now && t.status !== 'Completed'
        );
        
        const dueToday = tasks.filter(t => {
            if (!t.endAt || t.status === 'Completed') return false;
            return new Date(t.endAt).toDateString() === today;
        });
        
        const dueThisWeek = tasks.filter(t => {
            if (!t.endAt || t.status === 'Completed') return false;
            const end = new Date(t.endAt);
            return end > now && end <= weekLater;
        });
        
        const highPriority = tasks.filter(t => 
            t.priority === 'High' && t.status !== 'Completed'
        );

        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            total,
            completed,
            inProgress,
            todo,
            overdue,
            dueToday,
            dueThisWeek,
            highPriority,
            completionRate,
        };
    }, [tasks]);

    const formatDueDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
        
        if (diff < 0) return `${Math.abs(diff)} өдрийн өмнө`;
        if (diff === 0) return 'Өнөөдөр';
        if (diff === 1) return 'Маргааш';
        return `${diff} өдрийн дараа`;
    };

    return (
        <div className="space-y-6 mb-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Бүх төслүүд</h2>
                                <p className="text-primary-200 text-sm mt-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    {workspaces?.length || 0} төсөл
                                    <span className="mx-2">·</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    {stats.total} нийт task
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {workspaces?.slice(0, 5).map(ws => (
                            <div 
                                key={ws._id}
                                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                            >
                                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">{ws.title}</span>
                            </div>
                        ))}
                        {workspaces?.length > 5 && (
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                                <span className="text-sm font-medium">+{workspaces.length - 5} бусад</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">Нийт дууссан</span>
                            </div>
                            <span className="text-2xl font-bold">{stats.completionRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${stats.completionRate}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                    label="Нийт Task"
                    value={stats.total}
                    color="primary"
                />
                <StatCard
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    label="Хийгдэж буй"
                    value={stats.inProgress}
                    color="blue"
                />
                <StatCard
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    label="Дууссан"
                    value={stats.completed}
                    color="emerald"
                />
                <StatCard
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    }
                    label="Хугацаа дууссан"
                    value={stats.overdue.length}
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-primary-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-xl">
                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-primary-900">
                                Өнөөдөр дуусах
                            </h3>
                        </div>
                        <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full">
                            {stats.dueToday.length}
                        </span>
                    </div>
                    
                    {stats.dueToday.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-emerald-50 rounded-full">
                                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-500 font-medium">Өнөөдөр дуусах task алга!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {stats.dueToday.slice(0, 5).map(task => (
                                <TaskMiniCard 
                                    key={task._id} 
                                    task={task} 
                                    onClick={() => onTaskClick?.(task)}
                                />
                            ))}
                            {stats.dueToday.length > 5 && (
                                <div className="text-center pt-3 border-t border-primary-100">
                                    <p className="text-xs text-primary-500 font-medium">
                                        +{stats.dueToday.length - 5} бусад task
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl border border-primary-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-xl">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-primary-900">
                                Чухал
                            </h3>
                        </div>
                        <span className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1.5 rounded-full">
                            {stats.highPriority.length}
                        </span>
                    </div>
                    
                    {stats.highPriority.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-emerald-50 rounded-full">
                                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-500 font-medium">Яаралтай task алга!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {stats.highPriority.slice(0, 5).map(task => (
                                <TaskMiniCard 
                                    key={task._id} 
                                    task={task} 
                                    onClick={() => onTaskClick?.(task)}
                                />
                            ))}
                            {stats.highPriority.length > 5 && (
                                <div className="text-center pt-3 border-t border-primary-100">
                                    <p className="text-xs text-primary-500 font-medium">
                                        +{stats.highPriority.length - 5} бусад task
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {stats.overdue.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <h4 className="font-bold text-red-900 text-lg mb-1">
                                {stats.overdue.length} task-ын хугацаа дууссан!
                            </h4>
                            <div className="space-y-2">
                                {stats.overdue.slice(0, 3).map(task => (
                                    <div 
                                        key={task._id}
                                        onClick={() => onTaskClick?.(task)}
                                        className="flex items-center gap-3 bg-white/50 hover:bg-white rounded-lg px-3 py-2 cursor-pointer transition-colors border border-red-100"
                                    >
                                        <span className="text-sm font-medium text-red-900 flex-1 truncate">
                                            {task.title}
                                        </span>
                                        <span className="text-xs text-red-600 font-medium">
                                            {formatDueDate(task.endAt)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
function StatCard({ icon, label, value, color }) {
    const colorClasses = {
        primary: {
            bg: 'bg-primary-50',
            text: 'text-primary-600',
            border: 'border-primary-200',
            hover: 'hover:border-primary-300 hover:shadow-md',
        },
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-200',
            hover: 'hover:border-blue-300 hover:shadow-md',
        },
        emerald: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            border: 'border-emerald-200',
            hover: 'hover:border-emerald-300 hover:shadow-md',
        },
        red: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            border: 'border-red-200',
            hover: 'hover:border-red-300 hover:shadow-md',
        },
    };

    const classes = colorClasses[color];

    return (
        <div className={`rounded-2xl border ${classes.border} ${classes.bg} p-5 ${classes.hover} transition-all cursor-pointer`}>
            <div className={`flex items-center justify-center w-12 h-12 ${classes.bg} rounded-xl mb-3`}>
                <div className={classes.text}>
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-bold text-primary-900 mb-1">{value}</div>
            <div className="text-xs font-medium text-primary-600">{label}</div>
        </div>
    );
}
function TaskMiniCard({ task, onClick }) {
    const statusColors = {
        'To do': 'bg-slate-100 text-slate-700',
        'In progress': 'bg-blue-100 text-blue-700',
        'Completed': 'bg-emerald-100 text-emerald-700',
    };

    const statusIcons = {
        'To do': (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        'In progress': (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        'Completed': (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div 
            onClick={onClick}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 cursor-pointer transition-all border border-transparent hover:border-primary-200 group"
        >
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary-900 truncate group-hover:text-primary-700">
                    {task.title}
                </p>
                <p className="text-xs text-primary-500 truncate mt-0.5">
                    {task.description || 'Тайлбаргүй'}
                </p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${statusColors[task.status]}`}>
                {statusIcons[task.status]}
                {task.status}
            </span>
        </div>
    );
}
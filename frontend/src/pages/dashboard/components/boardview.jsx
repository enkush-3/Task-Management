export default function BoardView({ tasks, onTaskClick }) {
    const columns = {
        'To do': tasks.filter(t => t.status === 'To do'),
        'In progress': tasks.filter(t => t.status === 'In progress'),
        'Completed': tasks.filter(t => t.status === 'Completed'),
    };

    const columnStyles = {
        'To do': 'bg-slate-50 border-slate-200',
        'In progress': 'bg-blue-50 border-blue-200',
        'Completed': 'bg-emerald-50 border-emerald-200',
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {Object.entries(columns).map(([status, statusTasks]) => (
                <div key={status} className={`rounded-xl border-2 ${columnStyles[status]} p-4 min-h-[500px]`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                            {status}
                        </h3>
                        <span className="bg-white text-slate-600 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
                            {statusTasks.length}
                        </span>
                    </div>
                    <div className="space-y-3">
                        {statusTasks.map(task => (
                            <div
                                key={task._id}
                                onClick={() => onTaskClick(task)}
                                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition"
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    {task.icon && <span>{task.icon}</span>}
                                    <h4 className="font-medium text-slate-900 flex-1 line-clamp-2">
                                        {task.title}
                                    </h4>
                                </div>
                                {task.description && (
                                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                                        {task.description}
                                    </p>
                                )}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {task.priority && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    )}
                                    {task.category && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                            {task.category}
                                        </span>
                                    )}
                                    {task.endAt && (
                                        <span className="text-xs text-slate-500 ml-auto">
                                            {new Date(task.endAt).toLocaleDateString('mn-MN', { month: 'short', day: 'numeric' })}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {statusTasks.length === 0 && (
                            <p className="text-center text-sm text-slate-400 py-8">
                                Хоосон
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
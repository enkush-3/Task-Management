import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';

export default function TaskTable({ tasks, onEdit, onRequestDelete }) {
    return (
        <div className="bg-white rounded-xl border border-primary-200 overflow-hidden">
            <div className="grid grid-cols-[40px_1fr_100px_120px_120px_120px_120px_80px] gap-2 px-4 py-3 bg-primary-50/50 border-b border-primary-200 text-xs font-semibold text-primary-600 uppercase tracking-wider items-center">
                <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Нэр</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    <span>Чухал</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Төлөв</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Үлдсэн өдөр</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Эхлэх өдөр</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Дуусах өдөр</span>
                </div>
                <div className="text-center">Үйлдлүүд</div>
            </div>

            <div className="divide-y divide-primary-100">
                {tasks.map((task) => (
                    <TaskRow 
                        key={task._id} 
                        task={task} 
                        onEdit={onEdit}
                        onRequestDelete={onRequestDelete}
                    />
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-12 text-primary-400">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">Task алга</p>
                </div>
            )}
        </div>
    );
}

function TaskRow({ task, onEdit, onRequestDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task._id
    });

    const [daysLeft, setDaysLeft] = useState(0);
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        if (task.endAt) {
            const end = new Date(task.endAt);
            const now = new Date();
            const diff = end - now;
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            
            setDaysLeft(Math.max(0, days));
            setIsOverdue(days < 0);
        } else {
            setDaysLeft(0);
            setIsOverdue(false);
        }
    }, [task.endAt]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const statusStyles = {
        'To do': 'bg-slate-100 text-slate-700',
        'In progress': 'bg-blue-100 text-blue-700',
        'Completed': 'bg-emerald-100 text-emerald-700'
    };

    const priorityStyles = {
        'High': {
            bg: 'bg-red-50',
            text: 'text-red-700',
            border: 'border-red-200',
            dot: 'bg-red-500',
            icon: '🔴',
            label: 'High'
        },
        'Medium': {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            dot: 'bg-yellow-500',
            icon: '🟡',
            label: 'Medium'
        },
        'Low': {
            bg: 'bg-emerald-50',
            text: 'text-emerald-700',
            border: 'border-emerald-200',
            dot: 'bg-emerald-500',
            icon: '🟢',
            label: 'Low'
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('mn-MN', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const priority = priorityStyles[task.priority] || priorityStyles['Medium'];

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="grid grid-cols-[40px_1fr_100px_120px_120px_120px_120px_80px] gap-2 px-4 py-4 hover:bg-primary-50/30 transition-colors group items-center"
        >
            <div 
                {...listeners}
                className="flex items-center justify-center cursor-grab active:cursor-grabbing text-primary-300 hover:text-primary-600 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
            </div>

            <div className="flex items-center gap-3 min-w-0">
                {task.icon && <span className="text-xl flex-shrink-0">{task.icon}</span>}
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-primary-900 truncate">
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-xs text-primary-400 truncate mt-0.5">
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priority.bg} ${priority.text} ${priority.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></span>
                    {priority.label}
                </span>
            </div>

            <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[task.status] || 'bg-slate-100 text-slate-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        task.status === 'Completed' ? 'bg-emerald-500' :
                        task.status === 'In progress' ? 'bg-blue-500' : 'bg-slate-500'
                    }`}></span>
                    {task.status}
                </span>
            </div>

            <div className="flex items-center">
                {task.endAt ? (
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                        task.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700'
                            : isOverdue 
                                ? 'bg-red-50 text-red-700'
                                : daysLeft <= 3 
                                    ? 'bg-orange-50 text-orange-700'
                                    : 'bg-primary-50 text-primary-700'
                    }`}>
                        {task.status === 'Completed' ? (
                            <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Дууссан
                            </>
                        ) : isOverdue ? (
                            <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Дууссан
                            </>
                        ) : daysLeft === 0 ? (
                            <>Өнөөдөр</>
                        ) : daysLeft === 1 ? (
                            <>Маргааш</>
                        ) : (
                            <>{daysLeft} өдөр</>
                        )}
                    </span>
                ) : (
                    <span className="text-xs text-primary-300">-</span>
                )}
            </div>

            <div className="flex items-center text-sm text-primary-600">
                {task.startAt ? (
                    <span>{formatDate(task.startAt)}</span>
                ) : (
                    <span className="text-primary-300">-</span>
                )}
            </div>

            <div className="flex items-center text-sm text-primary-600">
                {task.endAt ? (
                    <span className={isOverdue && task.status !== 'Completed' ? 'text-red-600 font-medium' : ''}>
                        {formatDate(task.endAt)}
                    </span>
                ) : (
                    <span className="text-primary-300">-</span>
                )}
            </div>

            <div className="flex items-center justify-center gap-1">
                <button
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        e.preventDefault();
                        onEdit(task); 
                    }}
                    className="p-1.5 text-primary-400 hover:text-primary-600 hover:bg-primary-100 rounded transition"
                    title="Засах"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        e.preventDefault();
                        onRequestDelete(task._id, task.title);
                    }}
                    className="p-1.5 text-primary-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                    title="Устгах"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
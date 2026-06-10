import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function TaskCard({ task, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task._id
    });

    // ✅ Deadline counter
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

    // ✅ Priority colors (primary theme-д нийцсэн)
    const priorityColor = {
        'High': 'bg-red-500',
        'Medium': 'bg-yellow-500',
        'Low': 'bg-emerald-500'
    }[task.priority] || 'bg-slate-300';

    // ✅ Status colors (primary theme-д нийцсэн)
    const statusStyle = {
        'To do': 'bg-primary-100 text-primary-700',
        'In progress': 'bg-blue-100 text-blue-700',
        'Completed': 'bg-emerald-100 text-emerald-700'
    }[task.status] || 'bg-slate-100 text-slate-700';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white rounded-xl border border-primary-200 p-5 hover:shadow-lg hover:border-primary-300 transition-all cursor-grab active:cursor-grabbing group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {task.icon && <span className="text-xl flex-shrink-0">{task.icon}</span>}
                    <h3 className="font-semibold text-primary-900 truncate">
                        {task.title}
                    </h3>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition"
                        title="Засах"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                        title="Устгах"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`w-2 h-2 rounded-full ${priorityColor}`}></span>
                <span className="text-xs text-slate-600 font-medium">{task.priority || 'No priority'}</span>
                {task.category && (
                    <>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-600 bg-primary-50 border border-primary-200 px-2 py-0.5 rounded">
                            {task.category}
                        </span>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-primary-100">
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${statusStyle}`}>
                    {task.status}
                </span>

                {task.endAt && (
                    <span className={`text-xs flex items-center gap-1 ${
                        isOverdue && task.status !== 'Completed' 
                            ? 'text-red-600 font-medium' 
                            : daysLeft <= 3 && task.status !== 'Completed'
                                ? 'text-orange-600 font-medium'
                                : 'text-slate-500'
                    }`}>
                        {isOverdue && task.status !== 'Completed' ? (
                            <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Хугацаа дууссан
                            </>
                        ) : task.status === 'Completed' ? (
                            <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Дууссан
                            </>
                        ) : (
                            <>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {daysLeft === 0 ? 'Өнөөдөр' : daysLeft === 1 ? 'Маргааш' : `${daysLeft} өдөр`}
                            </>
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}
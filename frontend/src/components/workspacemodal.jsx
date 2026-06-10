import { useState, useEffect, useRef } from 'react';

export default function WorkspaceModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        title: '',
        icon: '📁',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const iconPickerRef = useRef(null);

    const commonIcons = ['📁', '💼', '🎓', '🏠', '🎨', '🚀', '📚', '💡', '⭐', '🎯', '💻', '🏆', '🎁', '🎉', '🔥', '💪', '🌟', '🎪'];

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                icon: initialData.icon || '📁',
            });
        } else {
            setFormData({ title: '', icon: '📁' });
        }
        setError('');
        setShowIconPicker(false);
    }, [initialData, isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (iconPickerRef.current && !iconPickerRef.current.contains(e.target)) {
                setShowIconPicker(false);
            }
        };
        if (showIconPicker) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showIconPicker]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError('Workspace-ийн нэр шаардлагатай');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await onSave(formData);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Хадгалахад алдаа гарлаа');
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleIconSelect = (icon) => {
        setFormData({ ...formData, icon });
        setShowIconPicker(false);
    };

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
                <div className="rounded-t-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 relative">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white">
                            {initialData ? 'Workspace засах' : 'Workspace үүсгэх'}
                        </h2>
                        <p className="text-primary-200 text-sm mt-1">
                            {initialData ? 'Мэдээллийг шинэчилнэ үү' : 'Шинэ ажлын орон зай үүсгэ'}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex items-start gap-2">
                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4">
                        
                        <div className="relative md:w-10 flex-shrink-0" ref={iconPickerRef}>
                            <label className="block text-xs font-semibold text-primary-900 mb-1.5">
                                Icon
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowIconPicker(!showIconPicker)}
                                className={`w-full aspect-square flex items-center justify-center text-3xl border-2 rounded-lg transition-all group ${
                                    showIconPicker 
                                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/30' 
                                        : 'border-primary-200 hover:border-primary-400 bg-white'
                                }`}
                                title="Icon солих"
                            >
                                <span className="group-hover:scale-110 transition-transform">
                                    {formData.icon}
                                </span>
                            </button>
                            <p className="text-[10px] text-primary-400 text-center mt-1">
                                Сонгох
                            </p>

                            {showIconPicker && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-primary-200 rounded-xl shadow-2xl p-3 z-200 animate-scale-in">
                                    <p className="text-[10px] font-bold text-primary-600 mb-2 uppercase tracking-wider">
                                        Түгээмэл Icon-ууд
                                    </p>
                                    <div className="grid grid-cols-6 gap-1.5 mb-3 overflow-y-auto max-h-20">
                                        {commonIcons.map((icon) => (
                                            <button
                                                key={icon}
                                                type="button"
                                                onClick={() => handleIconSelect(icon)}
                                                className={`aspect-square flex items-center justify-center text-xl rounded-md border-2 transition-all hover:scale-110 ${
                                                    formData.icon === icon
                                                        ? 'border-primary-500 bg-primary-50 shadow-md ring-1 ring-primary-500/30'
                                                        : 'border-primary-100 hover:border-primary-300 hover:bg-primary-50/50'
                                                }`}
                                            >
                                                {icon}
                                            </button>
                                        ))}
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold text-primary-600 mb-1 uppercase tracking-wider">
                                            Custom emoji
                                        </p>
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full px-2 py-1.5 border border-primary-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-center text-lg outline-none transition placeholder:text-primary-300"
                                            placeholder="🎁"
                                            maxLength={4}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="block text-xs font-semibold text-primary-900 mb-1.5">
                                Workspace-ийн нэр <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="flex-1 min-h-0 px-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition placeholder:text-primary-300 text-sm"
                                placeholder="Жишээ: Хувийн төслүүд"
                                maxLength={50}
                                autoFocus
                            />
                            <p className="text-xs text-primary-400 mt-1 text-right">
                                {formData.title.length}/50
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-primary-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 bg-white border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 font-medium transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            Цуцлах
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Хадгалж байна...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {initialData ? 'Засах' : 'Үүсгэх'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
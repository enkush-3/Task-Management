import { useState, useEffect } from 'react';

export default function TaskModal({ isOpen, onClose, onSave, initialData, selectedWorkspace }) {
  const getDateTimeLocal = (date) => {
    const d = new Date(date);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const defaultData = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To do',
    startAt: getDateTimeLocal(new Date()),
    endAt: getDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  };

  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'To do',
        startAt: initialData.startAt ? getDateTimeLocal(initialData.startAt) : getDateTimeLocal(new Date()),
        endAt: initialData.endAt ? getDateTimeLocal(initialData.endAt) : getDateTimeLocal(new Date(Date.now() + 24 * 60 * 60 * 1000)),
      });
    } else {
      setFormData({ ...defaultData });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // ESC товчоор хаах
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Гарчиг шаардлагатай';
    if (!formData.startAt) errs.startAt = 'Эхлэх огноо шаардлагатай';
    if (!formData.endAt) errs.endAt = 'Дуусах огноо шаардлагатай';
    if (new Date(formData.startAt) > new Date(formData.endAt)) {
      errs.endAt = 'Дуусах огноо эхлэхээс хойш байх ёстой';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        workspaceId: selectedWorkspace,
        startAt: new Date(formData.startAt).toISOString(),
        endAt: new Date(formData.endAt).toISOString(),
      };
      await onSave(submitData);
      onClose();
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Алдаа гарлаа' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  // ✅ Status options
  const statusOptions = [
    { value: 'To do', label: 'To do', color: 'bg-slate-100 text-slate-700 border-slate-200', activeColor: 'bg-slate-200 text-slate-900 border-slate-400 ring-2 ring-slate-400/30' },
    { value: 'In progress', label: 'In progress', color: 'bg-blue-50 text-blue-700 border-blue-200', activeColor: 'bg-blue-100 text-blue-900 border-blue-500 ring-2 ring-blue-500/30' },
    { value: 'Completed', label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', activeColor: 'bg-emerald-100 text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/30' },
  ];

  // ✅ Priority options
  const priorityOptions = [
    { value: 'Low', label: 'Low', icon: '🟢', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', activeColor: 'bg-emerald-100 text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/30' },
    { value: 'Medium', label: 'Medium', icon: '🟡', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', activeColor: 'bg-yellow-100 text-yellow-900 border-yellow-500 ring-2 ring-yellow-500/30' },
    { value: 'High', label: 'High', icon: '🔴', color: 'bg-red-50 text-red-700 border-red-200', activeColor: 'bg-red-100 text-red-900 border-red-500 ring-2 ring-red-500/30' },
  ];

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        
        {/* ✅ Header with Gradient */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 relative flex-shrink-0">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {initialData ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Task засах
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Шинэ Task
                  </>
                )}
              </h2>
              <p className="text-primary-200 text-sm mt-1">
                {initialData ? 'Task-ын мэдээллийг шинэчилнэ үү' : 'Шинэ даалгавар үүсгэх'}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Хаах"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ✅ Form Body — Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-1.5">
              Гарчиг <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition placeholder:text-primary-300"
              placeholder="Жишээ: Landing page дизайн"
              autoFocus
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-1.5">
              Тайлбар
            </label>
            <textarea
              value={formData.description}
              rows="3"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition placeholder:text-primary-300 resize-none"
              placeholder="Task-ын дэлгэрэнгүй тайлбар..."
            />
          </div>

          {/* ✅ Status — Badge Selector */}
          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Статус
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: option.value })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    formData.status === option.value ? option.activeColor : option.color
                  } hover:scale-105`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Priority — Badge Selector */}
          <div>
            <label className="block text-sm font-semibold text-primary-900 mb-2">
              Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: option.value })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all flex items-center gap-1.5 ${
                    formData.priority === option.value ? option.activeColor : option.color
                  } hover:scale-105`}
                >
                  <span>{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Dates — 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Эхлэх <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="datetime-local"
                value={formData.startAt}
                onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
              {errors.startAt && <p className="text-red-500 text-xs mt-1">{errors.startAt}</p>}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Дуусах <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="datetime-local"
                value={formData.endAt}
                onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                className="w-full px-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              />
              {errors.endAt && <p className="text-red-500 text-xs mt-1">{errors.endAt}</p>}
            </div>
          </div>

          {/* ✅ Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-primary-100">
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
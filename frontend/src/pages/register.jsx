import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaEyeSolid, LiaEyeSlash, LiaUserSolid, LiaIdCard, LiaEnvelopeSolid, LiaLockSolid } from "react-icons/lia";
import { useAuth } from '../context/authcontext';

export default function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const errs = {};
        if (!formData.fullname.trim()) errs.fullname = 'Нэр шаардлагатай';
        else if (formData.fullname.trim().length < 2) errs.fullname = 'Нэр хэт богино';

        if (!formData.username.trim()) errs.username = 'Хэрэглэгчийн нэр шаардлагатай';
        else if (formData.username.trim().length < 3) errs.username = 'Хэрэглэгчийн нэр хэт богино';
        else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) errs.username = 'Зөвхөн үсэг, тоо, доогуур зураас ашиглана';

        if (!formData.email.trim()) errs.email = 'И-мэйл шаардлагатай';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Зөв и-мэйл формат оруулна уу';

        if (!formData.password) errs.password = 'Нууц үг шаардлагатай';
        else if (formData.password.length < 6) errs.password = 'Нууц үг дор хаяж 6 тэмдэгт';

        if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Нууц үгүүд тохирохгүй байна';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const { confirmPassword, ...submitData } = formData;
            await register(submitData);
            alert('Бүртгэл амжилттай! Одоо нэвтэрнэ үү.');
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.message || 'Бүртгүүлэхэд алдаа гарлаа';
            setErrors({ submit: msg });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: null });
    };

    return (
        /* ✅ BACKGROUND GRADIENT: primary-50 → primary-100 → white */
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-white flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-primary-200">

                {/* ✅ HEADER GRADIENT: primary-600 → primary-800 */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-center relative overflow-hidden">
                    {/* Decorative circle for depth */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Create Account</h1>
                        <p className="text-primary-200 mt-2">Шинэ бүртгэл үүсгэж эхлээрэй</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    {errors.submit && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                            <p className="text-red-700 text-sm">{errors.submit}</p>
                        </div>
                    )}

                    {/* Fullname */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">Бүтэн нэр *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"><LiaUserSolid size={18} /></span>
                            <input
                                type="text"
                                value={formData.fullname}
                                onChange={(e) => handleChange('fullname', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="John Doe"
                                autoFocus
                            />
                        </div>
                        {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">Хэрэглэгчийн нэр *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"><LiaIdCard size={18} /></span>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleChange('username', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="johndoe123"
                            />
                        </div>
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">И-мэйл *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"><LiaEnvelopeSolid size={18} /></span>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="email@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">Нууц үг *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"><LiaLockSolid size={18} /></span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="w-full pl-10 pr-12 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="Дор хаяж 6 тэмдэгт"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 transition"
                            >
                                {showPassword ? <LiaEyeSlash size={20} /> : <LiaEyeSolid size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                        {/* Password strength indicator */}
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    <div className={`h-1 flex-1 rounded ${formData.password.length >= 6 ? 'bg-primary-400' : 'bg-primary-100'}`} />
                                    <div className={`h-1 flex-1 rounded ${formData.password.length >= 10 ? 'bg-primary-500' : 'bg-primary-100'}`} />
                                    <div className={`h-1 flex-1 rounded ${/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password) && formData.password.length >= 12 ? 'bg-primary-700' : 'bg-primary-100'}`} />
                                </div>
                                <p className="text-xs text-primary-500 mt-1">
                                    {formData.password.length < 6 && 'Сул нууц үг'}
                                    {formData.password.length >= 6 && formData.password.length < 10 && 'Дунд зэрэг'}
                                    {formData.password.length >= 10 && 'Хүчтэй нууц үг'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">Нууц үг давтах *</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"><LiaLockSolid size={18} /></span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="••••••••"
                            />
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-success text-lg">✓</span>
                            )}
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* ✅ BUTTON GRADIENT: primary-600 → primary-700, hover: primary-700 → primary-900 */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-900 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Бүртгэж байна...
                            </span>
                        ) : (
                            'Бүртгүүлэх'
                        )}
                    </button>

                    <div className="text-center text-sm text-primary-600 pt-2">
                        Бүртгэлтэй юу?{' '}
                        <Link to="/login" className="text-primary-700 hover:text-primary-900 hover:underline font-medium transition-colors">
                            Нэвтрэх
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
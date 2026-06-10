import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaEyeSolid, LiaEyeSlash, LiaUserSolid, LiaLockSolid } from "react-icons/lia";
import { useAuth } from '../context/authcontext';

export default function Login() {
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const errs = {};
        if (!formData.loginId.trim()) errs.loginId = 'И-мэйл эсвэл нэр шаардлагатай';
        if (!formData.password) errs.password = 'Нууц үг шаардлагатай';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || 'Нэвтрэхэд алдаа гарлаа';
            setErrors({ submit: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        /* ✅ BACKGROUND: Register-тэй ижил primary gradient */
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-white flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-primary-200">

                {/* ✅ HEADER: primary-700 → primary-900 (Register-ээс ялгаатай нь илүү dark) */}
                <div className="bg-gradient-to-r from-primary-700 to-primary-900 p-8 text-center relative overflow-hidden">
                    {/* Decorative blur circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        <p className="text-primary-200 mt-2">Бүртгэлдээ нэвтэрнэ үү</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {errors.submit && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                            <p className="text-red-700 text-sm">{errors.submit}</p>
                        </div>
                    )}

                    {/* Login ID */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">
                            И-мэйл эсвэл нэр
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                                <LiaUserSolid size={18} />
                            </span>
                            <input
                                type="text"
                                value={formData.loginId}
                                onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="email@example.com эсвэл username"
                                autoFocus
                            />
                        </div>
                        {errors.loginId && <p className="text-red-500 text-xs mt-1">{errors.loginId}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-primary-900 mb-1">
                            Нууц үг
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
                                <LiaLockSolid size={18} />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-12 py-2.5 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition placeholder:text-primary-300"
                                placeholder="••••••••"
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
                    </div>

                    {/* ✅ BUTTON: Typo засагдсан + primary gradient + glow shadow */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-medium hover:from-primary-700 hover:to-primary-900 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Нэвтэрч байна...
                            </span>
                        ) : (
                            'Нэвтрэх'
                        )}
                    </button>

                    <div className="text-center text-sm text-primary-600 pt-2">
                        Бүртгэлгүй юу?{' '}
                        <Link to="/register" className="text-primary-700 hover:text-primary-900 hover:underline font-medium transition-colors">
                            Бүртгүүлэх
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useToast } from '../context/useToast'
import { useAuth } from '../context/useAuth'
import { Notebook, Mail, Lock, Eye, EyeOff, KeyRound, X } from 'lucide-react';
import ShimmerLoader from '../effects/ShimmerLoader';
import OtpPopup from "../effects/OtpPopup";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false);

    const { showToast } = useToast();
    const { login, verifyOTP, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const roleRoutes = {
                'super-admin': '/dashboard/super-admin',
                'site-admin': '/dashboard/site-admin',
                'operator': '/dashboard/operator',
                'client-admin': '/dashboard/client-admin',
                'client-user': '/dashboard/client-user'
            };
            navigate(roleRoutes[user.role] || '/dashboard/super-admin', { replace: true });
        }
    }, [user, navigate]);

    if (loading) {
        return <ShimmerLoader />;
    }

    const checkMfaStatus = (email) => {
        const enabledEmails = ['superadmin@hrms.com', 'siteadmin@hrms.com'];
        return enabledEmails.includes(email.toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            showToast('Password must be at least 6 characters long', 'error');
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            const isMfaEnabled = checkMfaStatus(email);

            setShowOtpPopup(true);
        }
        else {
            showToast(result.error || "Wrong email or password", "error");
        }
    };

    const handleOtpVerify = async (otp) => {
        const result = await verifyOTP(otp);

        if (result.success) {
            showToast("OTP verified successfully!", "success");
            setShowOtpPopup(false);

            const roleRoutes = {
                'super-admin': '/dashboard/super-admin',
                'site-admin': '/dashboard/site-admin',
                'operator': '/dashboard/operator',
                'client-admin': '/dashboard/client-admin',
                'client-user': '/dashboard/client-user'
            };

            navigate(roleRoutes[user?.role] || '/dashboard/super-admin', { replace: true });
        } else {
            showToast(result.error || 'Invalid OTP', 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-neutral-800 font-mono tracking-widest">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl flex items-center justify-center shadow-lg rounded-lg overflow-hidden bg-stone-500">
                <div className="w-full p-6 sm:p-8 relative">
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-20">
                        <Notebook className="w-12 sm:w-16 md:w-18 h-8 sm:h-10 md:h-12 mt-2 text-slate transform" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-xl sm:text-2xl font-bold text-slate mb-6 sm:mb-7"> Login Page </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

                            {/* Email */}
                            <div className="">
                                <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                    EMAIL ID
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="input-field pl-10 pr-4 py-3 sm:py-4 border-2 rounded-r-4xl w-full text-sm sm:text-base"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Password */}
                            <div className="flex-row gap-4 md:flex">
                                <div className="relative w-full">
                                    <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                        PASSWORD
                                    </label>
                                    <div className="">
                                        <Lock className="absolute left-3 top-12 sm:top-14 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Secret Shhhh"
                                            className="input-field pl-10 pr-12 py-3 sm:py-4 border-2 rounded-r-4xl w-full font-mono tracking-widest text-sm sm:text-base"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 sm:right-3.5 top-12 sm:top-14.5 transform -translate-y-1/2 text-gray-400 hover:text-black"
                                        >
                                            {showPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 sm:py-4 text-base sm:text-lg scale-100 font-semibold rounded-4xl bg-black text-white hover:bg-gray-950 hover:scale-105 transition duration-300"
                            >
                                {loading ? 'Verifying...' : 'Send OTP'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* POP-UP */}
            {showOtpPopup && (
                <OtpPopup
                    email={email}
                    isMfaEnabled={user?.mfaEnabled} onClose={() => setShowOtpPopup(false)}
                    onVerify={handleOtpVerify}
                />
            )}
        </div>
    );
};

export default LoginPage;
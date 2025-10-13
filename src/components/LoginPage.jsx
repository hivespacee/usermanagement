import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/useToast'
import { Notebook, Mail, Lock, Eye, EyeOff, KeyRound, X } from 'lucide-react';
import ShimmerLoader from '../effects/ShimmerLoader';
import OtpPopup from "../effects/OtpPopup";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [otp, setOtp] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    // const [token, setToken] = useState('');

    const { showToast } = useToast();
    const navigate = useNavigate();

    if (loading) {
        return <ShimmerLoader />;
    }

    const checkMfaStatus = (email) => {
        const enabledEmails = ['user1@gmail.com', 'amaan@gmail.com'];
        return enabledEmails.includes(email.toLowerCase());
    };

    // const handleOtpSubmit = (e) => {
    //     e.preventDefault();
    //     if (otp.length !== 6) {
    //         showToast('Please enter a valid 6-digit OTP', 'error');
    //         return;
    //     }
    //     if (!/^\d+$/.test(otp)) {
    //         showToast('OTP must be numeric', 'error');
    //         return;
    //     }

    //     showToast('Login successful with MFA!', 'success');
    //     setShowOtpPopup(false);
    //     navigate('/demopage');
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password.length < 6) {
            showToast('Password must be at least 6 characters long', 'error');
            setLoading(false);
            return;
        }

        try {
            // const isMfaEnabled = checkMfaStatus(email);

            // if (isMfaEnabled) {
            //     setShowOtpPopup(true);
            // } else {
            //     showToast('Please enable MFA', 'info');
            //     navigate('/setup-mfa');
            // }
            setShowOtpPopup(true)
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-neutral-800 font-mono tracking-widest">
            <div className="w-full max-w-4xl flex items-center justify-center shadow-lg rounded-lg overflow-hidden bg-stone-500">
                <div className="w-full md:w-1/2 p-8 relative">
                    <div className="absolute top-4 right-4 opacity-20">
                        <Notebook className="w-18 h-12 mt-2 text-slate transform" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold text-slate mb-7"> Login Page </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Email */}
                            <div className="">
                                <label className="block text-md font-bold text-gray-900 mb-2">
                                    EMAIL ID
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="input-field pl-10 border-2 rounded-r-4xl"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Password */}
                            <div className="flex-row gap-4 md:flex">
                                <div className="relative w-full">
                                    <label className="block text-md font-bold text-gray-900 mb-2">
                                        PASSWORD
                                    </label>
                                    <div className="">
                                        <Lock className="absolute left-3 top-14 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Secret Shhhh"
                                            className="input-field pl-10 border-2 rounded-r-4xl w-full font-mono tracking-widest"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-14.5 transform -translate-y-1/2 text-gray-400 hover:text-black"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-4 text-lg scale-100 font-semibold rounded-4xl bg-black text-white hover:bg-gray-950 hover:scale-105 transition duration-300"
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
                    onClose={() => setShowOtpPopup(false)}
                    onVerify={(otp) => {
                        showToast("OTP verified successfully!", "success");
                        setShowOtpPopup(false);
                        navigate("/successfull-signup");
                    }}
                />
            )}
        </div>
    );
};

export default LoginPage;
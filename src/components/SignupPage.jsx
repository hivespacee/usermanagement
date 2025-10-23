import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContext } from '../context/ToastContext';
import { useToast } from '../context/useToast'
import { Notebook, User, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import ShimmerLoader from '../effects/ShimmerLoader';
import OtpPopup from "../effects/OtpPopup";

const SignupPage = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inviteId, setInviteId] = useState('');
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authMethod, setAuthMethod] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);

    //   const { signup } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    if (loading) {
        return <ShimmerLoader />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (firstname.length < 1 || firstname.length > 20 || lastname.length < 1 || lastname.length > 20) {
            showToast('Username must be between 1 and 20 characters', 'error');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters long', 'error');
            setLoading(false);
            return;
        }

        try {
            if (authMethod === 'otp') {
                setShowOtpPopup(true); 
            }
            else if (authMethod === 'totp') {
                navigate('/setup-mfa');
            }
        }
        finally {
            setLoading(false);
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
                        <h1 className="text-xl sm:text-2xl font-bold text-slate mb-6 sm:mb-7"> Welcome Sapien </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

                            {/* UserName */}
                            <div className="flex flex-col sm:flex-row w-full gap-4">
                                <div className="relative w-full">
                                    <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                        FIRST NAME
                                    </label>
                                    <div className="">
                                        <User className="absolute left-3 top-12 sm:top-14 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            className="input-field pl-10 pr-4 py-3 sm:py-4 border-2 rounded-r-4xl w-full font-mono tracking-widest text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                        LAST NAME
                                    </label>
                                    <div className="">
                                        <User className="absolute left-3 top-12 sm:top-14 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Last Name"
                                            className="input-field pl-10 pr-4 py-3 sm:py-4 border-2 rounded-r-4xl w-full font-mono tracking-widest text-sm sm:text-base"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
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

                            {/* Unique ID Popup Section */}
                            <div>
                                {/* Trigger Link */}
                                <p
                                    onClick={() => setShowInvitePopup(true)}
                                    className="text-xs sm:text-sm text-gray-900 hover:underline cursor-pointer"
                                >
                                    See Unique ID?
                                </p>

                                {/* Popup Modal */}
                                {showInvitePopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-stone-950/80 z-50 p-4">
                                        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative">
                                            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Unique ID</h2>
                                            <button
                                                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-black"
                                                onClick={() => setShowInvitePopup(false)}
                                            >
                                                <X className="w-4 sm:w-5 h-4 sm:h-5" />
                                            </button>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={inviteId}
                                                    onChange={(e) => setInviteId(e.target.value)}
                                                    placeholder="Enter your Unique ID"
                                                    className="input-field pl-10 pr-4 py-3 sm:py-4 border-2 rounded-r-4xl w-full text-sm sm:text-base"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>



                            {/* Verification Method */}
                            <div>
                                <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                    Verification Method
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="authMethod"
                                            value="otp"
                                            checked={authMethod === 'otp'}
                                            onChange={(e) => setAuthMethod(e.target.value)}
                                            className="accent-black w-4 h-4 cursor-pointer"
                                        />
                                        <span className="text-sm sm:text-base text-gray-800">OTP</span>
                                    </label>

                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="authMethod"
                                            value="totp"
                                            checked={authMethod === 'totp'}
                                            onChange={(e) => setAuthMethod(e.target.value)}
                                            className="accent-black w-4 h-4 cursor-pointer"
                                        />
                                        <span className="text-sm sm:text-base text-gray-800">TOTP</span>
                                    </label>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col sm:flex-row gap-4">
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

                                <div className="relative w-full">
                                    <label className="block text-sm sm:text-md font-bold text-gray-900 mb-2">
                                        CONFIRM PASSWORD
                                    </label>
                                    <div className="">
                                        <Lock className="absolute left-3 top-12 sm:top-14 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Again Secret Shhhh"
                                            className="input-field pl-10 pr-12 py-3 sm:py-4 border-2 rounded-r-4xl w-full font-mono tracking-widest text-sm sm:text-base"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 sm:right-3.5 top-12 sm:top-14.5 -translate-y-1/2 text-gray-400 hover:text-black transition-all duration-200 pointer-events-auto"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" /> : <Eye className="w-4 sm:w-5 h-4 sm:h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 sm:py-4 text-base sm:text-lg scale-100 font-semibold rounded-4xl bg-black text-white hover:bg-gray-900 hover:scale-105 transition duration-300"
                            >
                                {loading ? 'Creating account...' : 'Sign-Up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {showOtpPopup && (
                <OtpPopup
                    email={email}
                    onClose={() => setShowOtpPopup(false)}
                    onVerify={() => {
                        showToast("OTP verified successfully!", "success");
                        setShowOtpPopup(false);
                        navigate("/login");
                    }}
                />
            )}
        </div>
    );
};

export default SignupPage;
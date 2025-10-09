import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContext } from '../context/ToastContext';
import { useToast } from '../context/useToast'
import { Notebook, User, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import ShimmerLoader from '../effects/ShimmerLoader';

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
            showToast('Signed-up Successfully!', 'success');
            if (authMethod === 'otp') {
                navigate('/verify-otp');
            }
            else if (authMethod === 'totp') {
                navigate('/successfull-signup');
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-neutral-800 font-mono tracking-widest">
            <div className="w-full max-w-4xl flex items-center justify-center shadow-lg rounded-lg overflow-hidden bg-stone-500">
                <div className="w-full md:w-4/5 p-8 relative">
                    <div className="absolute top-4 right-4 opacity-20">
                        <Notebook className="w-18 h-12 mt-2 text-slate transform" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold text-slate mb-7"> Welcome Sapien </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* UserName */}
                            <div className="flex-row w-full gap-4 md:flex">
                                <div className="relative w-full">
                                    <label className="block text-md font-bold text-gray-900 mb-2">
                                        FIRST NAME
                                    </label>
                                    <div className="">
                                        <User className="absolute left-3 top-14 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            className="input-field pl-10 border-2 rounded-r-4xl w-full font-mono tracking-widest"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <label className="block text-md font-bold text-gray-900 mb-2">
                                        LAST NAME
                                    </label>
                                    <div className="">
                                        <User className="absolute left-3 top-14 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Last Name"
                                            className="input-field pl-10 border-2 rounded-r-4xl w-full font-mono tracking-widest"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
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

                            {/* Unique ID Popup Section */}
                            <div>
                                {/* <label className="block text-md font-bold text-gray-900 mb-2">
                                    UNIQUE ID
                                </label> */}

                                {/* Trigger Link */}
                                <p
                                    onClick={() => setShowInvitePopup(true)}
                                    className="text-sm text-gray-900 hover:underline cursor-pointer"
                                >
                                    See Unique ID?
                                </p>

                                {/* Popup Modal */}
                                {showInvitePopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-stone-950/80 z-50">
                                        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                                            <h2 className="text-lg font-bold text-gray-800 mb-4">Unique ID</h2>
                                            <button
                                                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                                                onClick={() => setShowInvitePopup(false)}
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={inviteId}
                                                    onChange={(e) => setInviteId(e.target.value)}
                                                    placeholder="Enter your Unique ID"
                                                    className="input-field pl-10 border-2 rounded-r-4xl w-full"
                                                    required
                                                />
                                            </div>

                                            {/* <div className="flex justify-end gap-3 mt-5">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowInvitePopup(false)}
                                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!inviteId.trim()) {
                                                            showToast('Please enter your Unique ID', 'error');
                                                            return;
                                                        }
                                                        setShowInvitePopup(false);
                                                        showToast('Unique ID added', 'success');
                                                    }}
                                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                                                >
                                                    Save
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                )}
                            </div>



                            {/* Verification Method */}
                            <div>
                                <label className="block text-md font-bold text-gray-900 mb-2">
                                    Verification Method
                                </label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="authMethod"
                                            value="otp"
                                            checked={authMethod === 'otp'}
                                            onChange={(e) => setAuthMethod(e.target.value)}
                                            className="accent-black w-4 h-4 cursor-pointer"
                                        />
                                        <span className="text-gray-800">OTP</span>
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
                                        <span className="text-gray-800">TOTP</span>
                                    </label>
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

                                <div className="relative w-full">
                                    <label className="block text-md font-bold text-gray-900 mb-2">
                                        CONFIRM PASSWORD
                                    </label>
                                    <div className="">
                                        <Lock className="absolute left-3 top-14 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Again Secret Shhhh"
                                            className="input-field pl-10 border-2 rounded-r-4xl w-full font-mono tracking-widest"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3.5 top-14.5 -translate-y-1/2 text-gray-400 hover:text-black transition-all duration-200 pointer-events-auto"

                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-4 text-lg scale-100 font-semibold rounded-4xl bg-black text-white hover:bg-gray-900 hover:scale-105 transition duration-300"
                            >
                                {loading ? 'Creating account...' : 'Sign-Up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
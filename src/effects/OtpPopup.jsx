import { useState } from "react";
import { X, KeyRound } from "lucide-react";
import { useToast } from "../context/useToast";

const OtpPopup = ({ email, onClose, onVerify }) => {
    const mockotp = "999999";
  const [otp, setOtp] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showToast("Please enter a valid 6-digit OTP", "error");
      return;
    }
    if(!/^\d+$/.test(otp)){
        showToast("OTP must be numeric", "error");
        return;
    }

    if(otp !== mockotp) {
        showToast("Invalid OTP. Please try again.", "error");
        return;
    }
    onVerify(otp);
  };

  return (
    <div className="fixed inset-0 bg-stone-950/80 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-lg relative w-[90%] max-w-md">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <KeyRound className="w-5 h-5" /> Enter OTP
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          An OTP has been sent to your email <strong>{email}</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-center font-mono text-lg tracking-widest mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPopup;

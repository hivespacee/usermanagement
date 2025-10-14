import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function MFASetupPage() {

  const navigate = useNavigate();  
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
//   const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate backend QR + secret fetching
  useEffect(() => {
    const fetchMFASetup = async () => {
      try {
        // Replace with your backend API call:
        // const res = await fetch("/api/mfa/setup");
        // const data = await res.json();
        const data = {
          qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?data=Y6RSJQAZS50CJZSLD7BJDYJNVZMHFS2&size=200x200",
          secret: "Y6RSJQAZS50CJZSLD7BJDYJNVZMHFS2",
        };
        setQrCodeUrl(data.qrCodeUrl);
        setSecret(data.secret);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching MFA data", error);
      }
    };
    fetchMFASetup();
  }, []);

  const handleCancel=(e)=>{
    e.preventDefault();
    navigate(-1);
  }

  const handleEnableMFA = (e) => {
    e.preventDefault();
    // Call backend API here to verify & enable MFA
    console.log("MFA enabled with:", { code });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-200 text-xl">
        Fetching your MFA setup...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-gray-200 font-poppins">
      <div className="bg-neutral-900/90 border border-neutral-700 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-3 text-center">
          Enable Multi-factor Authentication
        </h2>

        <p className="text-gray-400 text-sm mb-6 text-center leading-relaxed">
          Use any authenticator app that supports <br />
          <span className="text-white font-medium">Time-based One Time Password (TOTP)</span><br />
          Scan the QR code or copy your secret key manually.
        </p>

        <div className="flex flex-col items-center mb-4">
          <img
            src={qrCodeUrl}
            alt="MFA QR Code"
            className="w-48 h-48 rounded-lg border border-neutral-700 shadow-md"
          />
          <p className="mt-3 text-sm text-gray-300 font-mono tracking-wide">{secret}</p>
        </div>

        <form onSubmit={handleEnableMFA} className="space-y-4">
          {/* <div>
            <label className="block text-sm text-gray-300 mb-1">Current Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your current password"
              required
            />
          </div> */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Enter Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter code from authenticator"
              required
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-neutral-600 text-gray-300 hover:bg-neutral-800 transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
            >
              Enable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

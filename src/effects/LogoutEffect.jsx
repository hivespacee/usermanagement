import { useEffect } from "react";
import ByeCat from "../assets/bye-cat.png"; // 🔸 Place a suitable bye-bye GIF in /src/assets/

const LogoutEffect = ({ duration, redirectTo}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, redirectTo]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-poppins tracking-widest text-center">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        <img
          src={ByeCat}
          className="w-40 h-40 object-contain mb-2 animate-bounce-slow"
        />
        <h2 className="text-2xl font-bold text-gray-100 transition-transform duration-500 hover:scale-110">
          You are being logged out...
        </h2>

        <p className="text-gray-400 text-lg">See you soon ...</p>
        
        <div className="mt-6 w-48 h-1 bg-neutral-700 rounded-full overflow-hidden">
          <div className="h-full bg-amber-100 w-1/3 animate-ping" />
        </div>
      </div>
    </div>
  );
};

export default LogoutEffect;

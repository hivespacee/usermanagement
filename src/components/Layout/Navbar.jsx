import { useState, useRef, useEffect } from "react";
import { User, LogOut, Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [closing, setClosing] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleCloseSidebar = () => {
    setClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div className="w-full h-16 bg-neutral-900/90 border-b border-neutral-700 flex items-center justify-between px-6 relative">

      <button
        onClick={() => setShowSidebar(true)}
        className="md:hidden p-2 text-gray-200 hover:text-white transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="text-gray-200 text-lg font-bold tracking-widest">
        Kuch Nahi
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center mr-1 px-2.5 py-2.5 rounded-4xl bg-neutral-800 text-gray-200 hover:bg-neutral-700 border border-neutral-600 transition-all"
        >
          <User className="w-5 h-5 text-gray-400" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-33 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-md py-2 z-50 transition-all duration-200 ease-out transform origin-top animate-fadeIn">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 ml-2 text-sm text-gray-200 transition-all duration-300 hover:scale-[1.03] ease-in-out"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-500 tracking-wider">
                Logout
              </span>
            </button>
          </div>
        )}
      </div>

      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
          <div
            className={`w-64 bg-neutral-900 border-r border-neutral-700 p-4 flex flex-col gap-2 ${
              closing ? "animate-close" : "animate-slideIn"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg tracking-widest">
                Menu
              </h2>
              <button
                onClick={handleCloseSidebar}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar isMobile={true} />
          </div>

          <div className="flex-1" onClick={handleCloseSidebar}></div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

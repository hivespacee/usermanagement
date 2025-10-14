import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";


const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-16 bg-neutral-900/90 border-b border-neutral-700 flex items-center justify-between px-6 relative">
      <div className="text-gray-200 text-lg font-bold tracking-widest">
        Kuch Nahi
      </div>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center mr-1 px-2.5 py-2.5 rounded-4xl bg-neutral-800 text-gray-200 hover:bg-neutral-700 border border-neutral-600 transition-all"
        >
          <User className="w-5 h-5 flex items-center text-gray-400" />
          <div className="text-left">
            {/* <div className="text-sm font-medium">{user?.name || "User"}</div> */}
            {/* <div className="text-xs text-gray-400">{user?.role || "Role"}</div> */}
          </div>
          {/* <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
              }`}
          /> */}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-33 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-md py-2 z-50 transition-all duration-200 ease-out transform origin-top animate-fadeIn">
            {/* Dropdown item */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 ml-2 text-sm text-gray-200 transition-transform duration-300 hover:scale-105 ease-in-out"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-500 tracking-wide">Logout</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;

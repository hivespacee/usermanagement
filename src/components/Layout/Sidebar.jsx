import { LayoutDashboard, Settings, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItemBase =
    "flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-neutral-700/60 transition-colors duration-200";

  return (
    <aside
      className={`${isExpanded ? "w-52" : "w-19"}
       bg-neutral-900/80 border-r border-neutral-700 p-4 hidden md:flex flex-col gap-2 overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <NavLink to="/dashboard" className={navItemBase}>
        <LayoutDashboard className="w-6 h-6 text-gray-400 shrink-0 transition-transform duration-500" />
        <span
          className={`text-sm font-medium whitespace-nowrap text-gray-300 transition-all duration-500 ease-out ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
        >
          Dashboard
        </span>
      </NavLink>

      <NavLink to="/settings" className={navItemBase}>
        <Settings className="w-6 h-6 text-gray-400 shrink-0 transition-transform duration-500" />
        <span
          className={`text-sm font-medium whitespace-nowrap text-gray-300 transition-all duration-500 ease-out ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
        >
          Settings
        </span>
      </NavLink>

      <NavLink to="/security" className={navItemBase}>
        <Shield className="w-6 h-6 text-gray-400 shrink-0 transition-transform duration-500" />
        <span
          className={`text-sm font-medium whitespace-nowrap text-gray-300 transition-all duration-500 ease-out ${
            isExpanded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
        >
          Security
        </span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;

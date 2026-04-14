import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Timeline", path: "/timeline", icon: Clock },
    { name: "Stats", path: "/stats", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#1a3a32]">
              Keen<span className="text-[#2d5a4c]">Keeper</span>
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive
                    ? "bg-[#f0f4f3] text-[#1a3a32]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#1a3a32]"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

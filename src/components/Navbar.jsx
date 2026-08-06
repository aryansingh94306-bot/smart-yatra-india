import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Bot,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/SmartYatraLogo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Journey Planner", path: "/journey-planner" },
    { name: "Book Ticket", path: "/book-ticket" },
    { name: "Tracking", path: "/live-tracking" },
    { name: "My Ticket", path: "/ticket" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <>
      {/* Indian Tricolour */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="SmartYatra"
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                SmartYatra
              </h1>

              <p className="text-xs text-slate-500">
                One Platform. Every Journey.
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">

            <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200">
              <Bell size={20} />
            </button>

            <Link
              to="/ai-assistant"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              <Bot size={18} />
              AI Assistant
            </Link>

            <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200">
              <UserCircle size={28} />
            </button>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t bg-white lg:hidden">
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 hover:bg-slate-100"
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/ai-assistant"
              className="m-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white"
            >
              <Bot size={18} />
              AI Assistant
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
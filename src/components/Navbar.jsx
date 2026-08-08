import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Bot,
  UserCircle,
  Moon,
  Sun,
  Monitor,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/SmartYatraLogo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Journey Planner", path: "/journey-planner" },
  { name: "Book Ticket", path: "/book-ticket" },
  { name: "Tracking", path: "/live-tracking" },
  { name: "My Ticket", path: "/ticket" },
  { name: "Dashboard", path: "/dashboard" },
];

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileLinkClick = useCallback(() => setOpen(false), []);

  const ThemeToggle = () => {
    const Icon = themeIcons[theme];
    return (
      <motion.button
        onClick={toggleTheme}
        className="relative rounded-full bg-slate-100 dark:bg-slate-800 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        whileTap={{ scale: 0.9 }}
        aria-label={`Current theme: ${theme}. Click to cycle.`}
      >
        <Icon size={20} className="text-slate-700 dark:text-slate-300 transition-colors" />
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center"
          >
            {theme === "light" ? "☀" : theme === "dark" ? "🌙" : "⚙"}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  };

  const NotificationBell = () => (
    <motion.button
      className="relative rounded-full bg-slate-100 dark:bg-slate-800 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      whileTap={{ scale: 0.9 }}
      aria-label="Notifications"
    >
      <Bell size={20} className="text-slate-700 dark:text-slate-300" />
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
        3
      </span>
    </motion.button>
  );

  const ProfileButton = () => (
    <Link
      to="/profile"
      className="relative rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Profile"
    >
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || "Profile"}
          className="w-10 h-10 rounded-full object-cover border-2 border-white/50 dark:border-slate-700/50"
        />
      ) : (
        <UserCircle size={28} className="text-slate-500 dark:text-slate-400" />
      )}
    </Link>
  );

  const AIAssistantLink = () => (
    <Link
      to="/ai-assistant"
      className="group relative flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Bot size={18} className="relative z-10" />
      </motion.div>
      <span className="relative z-10">AI Assistant</span>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <Sparkles size={16} className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );

  const DesktopNav = () => (
    <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
      {navLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-orange-500/15 to-orange-600/15 text-orange-600 dark:text-orange-400"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400"
            }`
          }
          aria-current={location.pathname === item.path ? "page" : undefined}
        >
          {item.name}
          <AnimatePresence>
            {location.pathname === item.path && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              />
            )}
          </AnimatePresence>
        </NavLink>
      ))}
    </nav>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleMobileLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500/15 to-orange-600/15 text-orange-600 dark:text-orange-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.indexOf(item) * 0.05 }}
                >
                  {item.name}
                </motion.span>
              </NavLink>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <AIAssistantLink />
            </div>
            <div className="pt-4 flex items-center gap-4">
              <ThemeToggle />
              <NotificationBell />
              <ProfileButton />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const MobileMenuButton = () => (
    <motion.button
      onClick={() => setOpen(!open)}
      className="lg:hidden rounded-xl bg-slate-100 dark:bg-slate-800 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      whileTap={{ scale: 0.9, rotate: open ? 90 : -90 }}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {open ? <X size={26} className="text-slate-700 dark:text-slate-300" /> : <Menu size={26} className="text-slate-700 dark:text-slate-300" />}
    </motion.button>
  );

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6" />
      </header>
    );
  }

  return (
    <>
      {/* Indian Tricolour Top Bar */}
      <div
        className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"
        aria-hidden="true"
      />

      <header
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? "border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-glass"
            : "border-b border-transparent bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl"
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="SmartYatra Home"
          >
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <img
                src={logo}
                alt=""
                className="h-12 w-12 rounded-2xl object-cover shadow-lg"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center"
              >
                <Sparkles size={12} className="text-white" />
              </motion.div>
            </motion.div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                SmartYatra
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                One Platform. Every Journey.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation + Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <DesktopNav />

            <div className="flex items-center gap-2 ml-4 border-l border-slate-200 dark:border-slate-700 pl-4">
              <ThemeToggle />
              <NotificationBell />
              <AIAssistantLink />
              <ProfileButton />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            <ProfileButton />
            <MobileMenuButton />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </header>
    </>
  );
}
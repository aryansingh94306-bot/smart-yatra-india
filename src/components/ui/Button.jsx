import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/40 focus-visible:ring-orange-500 active:scale-[0.98]",
    secondary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus-visible:ring-slate-500 active:scale-[0.98]",
    outline: "bg-transparent text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-500 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500 active:scale-[0.98]",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:shadow-green-500/40 focus-visible:ring-green-500 active:scale-[0.98]",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/40 focus-visible:ring-red-500 active:scale-[0.98]",
    glass: "glass-light text-slate-900 border-white/30 hover:bg-white/90 focus-visible:ring-slate-500 active:scale-[0.98]",
    glassDark: "glass-dark text-white border-white/20 hover:bg-slate-900/90 focus-visible:ring-slate-400 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
    xl: "px-10 py-5 text-xl gap-3",
    icon: "p-3",
    iconLg: "p-4",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      whileTap={{ scale: 0.97 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
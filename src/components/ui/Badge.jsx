import { forwardRef } from "react";
import { motion } from "framer-motion";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md", 
  className = "",
  dot = false,
  dotColor,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-transparent",
    secondary: "bg-slate-100 text-slate-900 border border-slate-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
    premium: "bg-gradient-to-r from-slate-900 to-slate-700 text-white border-transparent",
    glass: "glass-light text-slate-900 border-white/30",
    glassDark: "glass-dark text-white border-white/20",
    outline: "bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-50",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs gap-1",
    sm: "px-2.5 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
    xl: "px-5 py-2.5 text-lg gap-2.5",
  };

  return (
    <motion.span
      ref={ref}
      className={`
        inline-flex items-center justify-center font-semibold rounded-full
        transition-all duration-300
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {dot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full ${dotColor || 
            (variant === 'success' ? 'bg-green-500' : 
             variant === 'warning' ? 'bg-amber-500' : 
             variant === 'danger' ? 'bg-red-500' : 
             variant === 'info' ? 'bg-blue-500' : 
             variant === 'primary' ? 'bg-orange-500' : 'bg-slate-500')
          }`}
        />
      )}
      {children}
    </motion.span>
  );
});

Badge.displayName = "Badge";

export default Badge;
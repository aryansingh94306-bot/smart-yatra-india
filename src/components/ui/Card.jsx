import { forwardRef } from "react";
import { motion } from "framer-motion";

const Card = forwardRef(({ 
  children, 
  className = "", 
  variant = "default", 
  padding = "lg",
  hover = false,
  onClick,
  ...props 
}, ref) => {
  const variants = {
    default: "glass-card bg-white/85 border-white/30 shadow-glass",
    dark: "glass-card-dark bg-slate-900/85 border-white/10 shadow-glass-dark",
    gradient: "bg-gradient-to-br from-orange-500/10 to-green-500/10 border-orange-200/50 shadow-glass",
    premium: "bg-white border-slate-100 shadow-premium",
    premiumDark: "bg-slate-900 border-slate-800 shadow-premium-dark",
    glass: "glass-light border-white/30",
    glassDark: "glass-dark border-white/10",
    bordered: "bg-white border-slate-200 shadow-sm",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const hoverStyles = hover 
    ? "transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1 cursor-pointer" 
    : "";

  const Component = onClick ? motion.div : "div";

  return (
    <Component
      ref={ref}
      className={`${variants[variant]} ${paddings[padding]} rounded-3xl ${hoverStyles} ${className}`}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";

export const CardHeader = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(({ children, className = "", ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-bold text-slate-900 ${className}`} {...props}>
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef(({ children, className = "", ...props }, ref) => (
  <p ref={ref} className={`mt-2 text-slate-600 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef(({ children, className = "", ...props }, ref) => (
  <div ref={ref} className={`mt-6 pt-6 border-t border-slate-100 ${className}`} {...props}>
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

export default Card;
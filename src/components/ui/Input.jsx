import { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(({ 
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  leftElement,
  rightElement,
  className = "",
  inputClassName = "",
  containerClassName = "",
  id,
  ...props 
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block mb-2 font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 peer-focus:text-orange-500 peer-focus-within:text-orange-500">
            {leftIcon}
          </div>
        )}
        {leftElement && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {leftElement}
          </div>
        )}
        <motion.input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-2xl border bg-white/80 backdrop-blur-sm
            transition-all duration-300
            placeholder:text-slate-400
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${error ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : "border-slate-200 hover:border-slate-300"}
            ${leftIcon || leftElement ? "pl-12" : "pl-5"}
            ${rightIcon || rightElement ? "pr-12" : "pr-5"}
            py-4 text-slate-900 text-base
            ${inputClassName}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="mt-2 text-sm text-slate-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export const Textarea = forwardRef(({ 
  label,
  error,
  hint,
  className = "",
  inputClassName = "",
  containerClassName = "",
  id,
  ...props 
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block mb-2 font-medium text-slate-700">
          {label}
        </label>
      )}
      <motion.textarea
        ref={ref}
        id={inputId}
        className={`
          w-full rounded-2xl border bg-white/80 backdrop-blur-sm p-5
          transition-all duration-300 resize-none
          placeholder:text-slate-400
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500
          disabled:bg-slate-100 disabled:cursor-not-allowed
          ${error ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : "border-slate-200 hover:border-slate-300"}
          text-slate-900 text-base leading-relaxed
          ${inputClassName}
        `}
        whileFocus={{ scale: 1.01 }}
        {...props}
      />
      {error && (
        <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="mt-2 text-sm text-slate-500">{hint}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export const Select = forwardRef(({ 
  label,
  error,
  hint,
  options,
  placeholder,
  className = "",
  selectClassName = "",
  containerClassName = "",
  id,
  ...props 
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block mb-2 font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <motion.select
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-2xl border bg-white/80 backdrop-blur-sm appearance-none
            transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-500
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${error ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500" : "border-slate-200 hover:border-slate-300"}
            pl-5 pr-12 py-4 text-slate-900 text-base
            ${selectClassName}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options?.map((opt, i) => (
            <option key={i} value={opt.value ?? opt}>{opt.label ?? opt}</option>
          ))}
        </motion.select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {error && (
        <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </motion.p>
      )}
      {hint && !error && (
        <p className="mt-2 text-sm text-slate-500">{hint}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Input;
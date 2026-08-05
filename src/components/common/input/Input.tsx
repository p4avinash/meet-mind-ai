import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div
          className={clsx(
            "flex h-12 items-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 transition-all duration-200",
            "focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20",
            error && "border-red-500",
            props.disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {leftIcon && <div className="mr-2 flex items-center text-zinc-500">{leftIcon}</div>}

          <input
            ref={ref}
            className={clsx(
              "h-full w-full bg-transparent text-white placeholder:text-zinc-500 outline-none",
              className,
            )}
            {...props}
          />

          {rightIcon && <div className="ml-2 flex items-center text-zinc-500">{rightIcon}</div>}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;


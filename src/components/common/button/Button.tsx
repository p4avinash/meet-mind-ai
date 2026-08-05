import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button = ({
    children,
    className,
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    variant = "primary",
    size = "md",
    disabled,
    ...props
}: ButtonProps) => {
    const variantClasses = {
        primary:
            "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:shadow-[0_10px_30px_rgba(124,58,237,0.35)]",

        secondary:
            "bg-[#111827] border border-zinc-700 text-white hover:border-violet-500",

        ghost:
            "bg-transparent text-zinc-300 hover:bg-zinc-800",

        danger:
            "bg-red-600 text-white hover:bg-red-500",
    };

    const sizeClasses = {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
    };

    return (
        <button
            disabled={disabled || isLoading}
            className={clsx(
                "inline-flex items-center justify-center gap-2",
                "rounded-xl font-semibold",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.02]",
                "active:scale-[0.98]",
                "disabled:pointer-events-none disabled:opacity-50",

                variantClasses[variant],
                sizeClasses[size],

                fullWidth && "w-full",

                className
            )}
            {...props}
        >
            {isLoading ? (
                "Loading..."
            ) : (
                <>
                    {leftIcon}
                    {children}
                    {rightIcon}
                </>
            )}
        </button>
    );
};

export default Button;
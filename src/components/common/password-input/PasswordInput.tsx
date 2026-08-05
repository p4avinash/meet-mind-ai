import { useState, forwardRef, type InputHTMLAttributes } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Input from "../input";

interface PasswordInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

const PasswordInput = forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            ref={ref}
            label={label}
            error={error}
            type={showPassword ? "text" : "password"}
            rightIcon={
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer text-zinc-500 transition hover:text-zinc-300"
                >
                    {showPassword ? (
                        <LuEye size={18} />

                    ) : (
                        <LuEyeClosed size={18} />
                    )}
                </button>
            }
            {...props}
        />
    );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
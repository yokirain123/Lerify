import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", variant = "solid", ...props }, ref) => {
    const baseClasses = `
      w-full
      border
      disabled:cursor-not-allowed
      disabled:opacity-50
      transition
      duration-300
      h-[40px]
    `;

    const variantClasses = variant === "outline"
      ? "bg-transparent text-[var(--accent-color)] border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white"
      : "bg-bg-color text-white border-transparent hover:text-[var(--accent-color)]";

    return (
      <button
        type={type}
        className={twMerge(baseClasses, variantClasses, className)}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

import React, { forwardRef } from "react";
import { BsPersonFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
            w-full
            rounded-full
            bg-[var(--bg-color)]
            border
            border-transparent
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-white
            hover:text-[var(--accent-color)]
            transition
            duration-300
        `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        <BsPersonFill size={18} />
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

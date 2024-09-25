import React, { forwardRef } from "react";
import { MdAccountCircle } from "react-icons/md";
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
            bg-bg-color
            border
            border-transparent
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-white
            hover:text-[var(--accent-color)]
            transition
            duration-300
            h-[40px]
        `,
          className
        )}
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

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
          bg-[var(--bg-color)]
          rounded-2xl
          w-full
          h-fit
          p-2
        `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;

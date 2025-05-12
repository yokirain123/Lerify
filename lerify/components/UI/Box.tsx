import React, { Children } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps { 
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    return (
        <div className={twMerge(`
            bg-[var(--bg-color)] rounded-2xl justify-center h-fit w-full`,
        className
        )}
        >
            {children}
        </div>
    );
}

export default Box;

import React from 'react';
import Link from 'next/link';

import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link href={href} className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            text-[var(--inactive-text)]
            align-middle
            transition
            duration-300
            hover:text-[var(--accent-color)]
        `,
        active && "text-[var(--accent-color)]"
        )}>
            <Icon size={26}/>
            <p className='text-[var(--inactive-color)]'>{label}</p>
        </Link>
    );
}

export default SidebarItem;


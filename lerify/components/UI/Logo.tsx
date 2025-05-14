import React from 'react';
import Link from 'next/link';
import { GiSpotedFlower } from 'react-icons/gi';

const Logo = () => {
    return (
        <Link href="/" className='hidden md:block text-accent-color'>
            <GiSpotedFlower size={70} />
        </Link>
    );
};

export default Logo;

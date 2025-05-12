import React from 'react';
import { GiSpotedFlower } from "react-icons/gi";

const Logo = () => {
    return (
        <div className='hidden md:block absolute top-7 left-8 text-accent-color'>
            <GiSpotedFlower size={70} />
        </div>
    );
}

export default Logo;

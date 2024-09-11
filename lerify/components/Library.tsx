"use client"

import React from 'react';

import { FaPlus } from 'react-icons/fa6';
import { TbPlaylist } from 'react-icons/tb';

const Library = () => {

    const onClick = () => {

    }

    return (
        <div className='flex flex-col '>
            <div className="flex items-center justify-between">
                <div className="inline-flex gap-x-2 text-[var(--inactive-text)]">
                    <TbPlaylist size={26} className=''/>
                </div>
                {/* <FaPlus onClick={onClick} className='cursor-pointer text-[--inactive-text] hover:text-[var(--accent-color)] transition duration-300'/> */}
            </div>
            {/* <div className="flex flex-col gap-y-2 mt-4 px-3">list of songs</div> */}
        </div>
    );
}

export default Library;

import React from 'react'
import { IoPlay, IoPlaySkipBackSharp, IoPlaySkipForward } from 'react-icons/io5'

const Player = () => {
  return (
    <div className='text-white bg-black w-full h-[100px] fixed bottom-0 px-10 flex flex-col gap-3'>
        <div className='flex items-center justify-center gap-5'>
            <IoPlaySkipBackSharp size={30} />
            <IoPlay size={50} />
            <IoPlaySkipForward size={30} />
        </div>
        <div className='bg-white rounded-2xl w-full h-[7px]'>

        </div>
    </div>
  )
}

export default Player
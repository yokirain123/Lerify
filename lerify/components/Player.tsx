"use client"

import useGetSongById from '@/hooks/useGetSongById'
// import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import usePlayer from '@/hooks/usePlayer'
import React from 'react'
import { IoPlay, IoPlaySkipBackSharp, IoPlaySkipForward } from 'react-icons/io5'

const Player = () => {

  const player = usePlayer()
  const {song} = useGetSongById(player.activeId)

  // const songUrl = useLoadSongUrl(song!)

  // if (!song || !songUrl || !player.activeId) {
  //   return null
  // }

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
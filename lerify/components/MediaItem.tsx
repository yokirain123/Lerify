"use client"

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import React from 'react'
import Image from 'next/image';

interface MediaItemProps {
    data: Song
    onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({data, onClick}) => {
    const imageUrl = useLoadImage(data)

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
    }
  return (
    <div className='flex w-[200px]'>
      <div className="flex flex-col text-center" onClick={handleClick}>
      {imageUrl ? (
        <Image className='rounded-xl'
          src={imageUrl}
          alt={data.title}
          width={200}  // Adjust the width as needed
          height={200} // Adjust the height as needed
        />
      ) : (
        <p>No image available</p>  // Placeholder text or element if imageUrl is null
      )}
        <p className='text-2xl font-bold text-accent-color'>{data.title}</p>
        <p>{data.author}</p>
    </div>
    </div>
  )
}

export default MediaItem
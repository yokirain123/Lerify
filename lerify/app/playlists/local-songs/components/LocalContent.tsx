"use client"

import SongItem from '@/components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';
import React from 'react';

interface PageContentProps {
    songs: Song[]
}

const LocalContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    
    if (songs.length === 0) { 
        return (
            <div className='text-white'>No songs available</div>
        ) }
    return (
        <div className='flex gap-x-8 px-6'>
            {songs.map((item) => (
                <SongItem 
                key={item.id}
                onClick={(id: string) => onPlay(id)}
                data={item}/>
            ))}
        </div>
    );
}

export default LocalContent;

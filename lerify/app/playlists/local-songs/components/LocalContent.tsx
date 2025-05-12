"use client"

import MediaItem from '@/components/MediaItem';
import SongItem from '@/components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';
import React from 'react';

interface PageContentProps {
    songs: Song[];
}

const LocalContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className='text-white text-center mt-10'>No songs available</div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3 pl-6 pb-32">
            {songs.map((item) => (
                <MediaItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item} />
            ))}
        </div>
    );
}

export default LocalContent;

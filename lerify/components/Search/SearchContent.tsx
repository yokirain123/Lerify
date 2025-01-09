"use client"

import { Song } from '@/types'; 
import MediaItem from '../MediaItem';

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    if (songs.length === 0) {
        return <div className='text-white'>No song found</div>;
    }

    return (
        <div className='grid grid-cols-5 grid-rows-1 gap-4'>
            {songs.map(song => (
                <div key={song.id} className="text-white w-[200px]">
                    <div>
                        <MediaItem onClick={() => {}}
                            data={song}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchContent;

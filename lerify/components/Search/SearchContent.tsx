"use client"

import { Song } from '@/types'

interface SearchContentProps {
    songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    if (songs.length === 0) {
        return (
            <div className='text-white'>No song found</div>
        )
    }

    return (
        <div>Search contnre</div>
    )
}

export default SearchContent
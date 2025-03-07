"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent } from "react";
import Input from "../Input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");

    const placeholders = [
        "Search...",
        "What are you looking for?",
        "So, what's on your mind today?",
        "Discover something new?",
        "Enter a title or artist...",
        "The perfect track is just a search away...",
        "Let the music hunt begin...",
        "Search for a song, no need to roll for initiative.",
        "Need a track that’s over 9000?",
        "Find a tune to make you feel like The Chosen One.",
        "Type a song to relive Back to the Future moments."
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * placeholders.length);
        setPlaceholder(placeholders[randomIndex]);
    }, []);

    const handleSearchSubmit = () => {
        if (value.trim()) {
            const query = { title: value };
            const url = qs.stringifyUrl({
                url: '/search',
                query: query,
            });
            router.push(url);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className="flex justify-center w-full relative">
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-[75%] py-6 px-16 border-accent-color border-2 rounded-2xl text-white text-xl"
            />
        </div>
    );
};

export default SearchInput;

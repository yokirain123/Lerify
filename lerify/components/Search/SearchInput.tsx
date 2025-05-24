"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent } from "react";
import Input from "../UI/Input";

interface SearchInputProps {
    className?: string;
    children?: React.ReactNode;
  }
  
  const SearchInput: React.FC<SearchInputProps> = ({
    className = "",
    children,
  }) => {
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
      "Type a song to relive Back to the Future moments.",
    ];
  
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setPlaceholder(placeholders[randomIndex]);
    }, []);
  
    const handleSearchSubmit = () => {
      if (value.trim()) {
        const query = { query: value };
        const url = qs.stringifyUrl({
          url: "/search",
          query: query,
        });
        router.push(url);
      }
    };
  
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearchSubmit();
      }
    };
  
    return (
      <div className={`relative w-full ${className}`}>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full py-5 pl-6 pr-14 border-accent-color border-2 rounded-2xl text-theme text-lg bg-[var(--bg-color)]"
        />
        {children}
      </div>
    );
  };
  
  export default SearchInput;  
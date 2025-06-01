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
      "Пошук...",
      "Що шукаєш?",
      "Про що ти сьогодні думаєш?",
      "Відкрий для себе щось новеньке!",
      "Введи назву пісні або виконавця...",
      "Ідеальний трек вже чекає на тебе...",
      "Нехай полювання на музику розпочнеться...",
      "Шукай пісню — кидати кубик на ініціативу не потрібно.",
      "Потрібен трек, що перевищує 9000?",
      "Знайди мелодію, щоб відчути себе Обраним.",
      "Введи пісню та перенесися Назад у майбутнє.",
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
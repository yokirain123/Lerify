"use client"

import qs from "query-string"

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../Input";

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }
    }, [debouncedValue, router])

    return (
        <Input placeholder="Find?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[75%] py-6 px-16 border-accent-color border-2 rounded-2xl text-white text-xl"
        />
    )
}
export default SearchInput;
import { Song } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsByQuery = async (query: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!query) {
    const { data } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    return (data as Song[]) || [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching songs:", error.message);
    return [];
  }

  return data as Song[];
};

export default getSongsByQuery;

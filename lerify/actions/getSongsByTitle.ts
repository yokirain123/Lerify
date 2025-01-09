import { Song } from "@/types";
import { cookies } from "next/headers";
import getSongs from "./getSongs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // Await cookies before passing them to the client
  const supabase = createServerComponentClient({
    cookies: cookies, // Await the cookies here
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
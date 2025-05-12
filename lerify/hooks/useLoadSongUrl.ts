import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadSongUrl = async (song: Song): Promise<string> => {
  const supabase = createClientComponentClient();

  if (!song) return "";

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default loadSongUrl;

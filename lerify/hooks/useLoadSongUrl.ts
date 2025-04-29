import { Song } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useLoadSongUrl = (song: Song) => {
  const { data: session } = useSession(); // Ensure the user is authenticated and has an access token

  console.log("Song Object:", song); // Debugging log for the song object
  console.log("Access Token from Session:", session?.accessToken); // Debugging log for the access token

  const [songUrl, setSongUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!song) return; // If no song, don't do anything
    if (!session?.accessToken) {
      console.error("No access token available in session");
      return;
    }

    const fetchSongPreviewUrl = async () => {
      try {
        const res = await fetch(`/api/spotify/track/${song.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch song preview URL", res.status);
          return;
        }

        const data = await res.json();
        if (!data.preview_url) {
          console.error("No preview URL found in the response");
          return;
        }

        setSongUrl(data.preview_url); // Set the song URL state
      } catch (error) {
        console.error("Error fetching preview URL", error);
      }
    };

    fetchSongPreviewUrl(); // Fetch the song URL when the song changes
  }, [song, session]); // Dependency array includes both song and session

  return songUrl;
};

export default useLoadSongUrl;

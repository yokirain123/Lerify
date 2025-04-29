import { Song } from "@/types";
import { useSession } from "next-auth/react"; // Make sure you are using the session for access token

const useLoadSongUrl = (song: Song) => {
  const { data: session } = useSession(); // Ensure the user is authenticated and has an access token

  if (!song || !session?.accessToken) {
    return ''; // If no song or access token, return empty string
  }

  const fetchSongPreviewUrl = async () => {
    try {
      const res = await fetch(`/api/spotify/track/${song.id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch song preview URL");
        return '';
      }

      const data = await res.json();
      return data.preview_url || ''; // Return the preview URL of the song
    } catch (error) {
      console.error("Error fetching preview URL", error);
      return '';
    }
  };

  const previewUrl = fetchSongPreviewUrl(); // Call the fetch function

  return previewUrl; // Return the preview URL of the song
};

export default useLoadSongUrl;

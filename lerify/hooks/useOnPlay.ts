import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react"; 
import { SpotifySong } from "@/types/index"; // Ensure SpotifySong type matches your structure

const useOnPlay = (songs: SpotifySong[]) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data: session } = useSession();

  const fetchPreviewUrl = async (id: string): Promise<string | null> => {
    if (!session?.accessToken) {
      console.error("No access token available");
      return null;
    }
  
    console.log("Access Token:", session?.accessToken);
    console.log("Fetching track ID:", id);
  
    try {
      const res = await fetch(`/api/spotify/track/${id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
  
      if (!res.ok) {
        console.error("Failed to fetch track:", res.status);
        if (res.status === 401) {
          alert("Unauthorized access. Please log in again.");
        }
        return null;
      }
  
      const data = await res.json();
      console.log("Track data:", data);
  
      return data.preview_url || null;
    } catch (error) {
      console.error("Failed to fetch preview URL", error);
      return null;
    }
  };
  

  const onPlay = async (id: string) => {
    const song = songs.find((s) => s.id === id);
    if (!song) {
      alert("Song not found.");
      return;
    }

    let previewUrl = song.previewUrl;

    if (!previewUrl) {
      setIsLoading(true);
      previewUrl = await fetchPreviewUrl(id);
      setIsLoading(false);

      if (!previewUrl) {
        alert("Sorry, no preview available for this song.");
        return;
      }
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(previewUrl);
    audioRef.current = audio;

    try {
      await audio.play();
      setCurrentAudio(audio);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { onPlay, isLoading }; // ✅ Correct return here
};

export default useOnPlay;

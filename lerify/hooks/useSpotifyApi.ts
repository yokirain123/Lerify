import { useSession } from "next-auth/react";

export default function useSpotifyApi() {
  const { data: session } = useSession();

  const fetchSpotify = async (url: string, options: RequestInit = {}) => {
    if (!session?.accessToken) {
      throw new Error("No access token available");
    }

    const res = await fetch(`https://api.spotify.com/v1/${url}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      let errorMessage = "Spotify API error";
      try {
        const error = await res.json();
        errorMessage = error.error?.message || errorMessage;
      } catch {
        // response not JSON
      }
      throw new Error(errorMessage);
    }

    return res.json();
  };

  return fetchSpotify;
}

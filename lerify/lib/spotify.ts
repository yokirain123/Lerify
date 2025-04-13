export async function fetchPlaylists(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}

export async function fetchUserPlaylists(accessToken: string): Promise<{ items: SpotifyPlaylist[] }> {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
}

export async function fetchPlaylistById(accessToken: string, playlistId: string): Promise<SpotifyPlaylist> {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch playlist: ${response.statusText}`);
  }
  
  return response.json();
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
  };
  tracks: {
    href: string;
    total: number;
  };
  public: boolean;
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: string | null;
    total: number;
  };
}

export interface SpotifyPlaylistResponse {
  items: SpotifyPlaylist[];
  limit: number;
  offset: number;
  total: number;
  next: string | null;
  previous: string | null;
  href: string;
}



export interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: {
      url: string;
    }[];
  };
  duration_ms: number;
  uri: string;
}
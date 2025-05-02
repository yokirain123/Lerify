// actions/getPlaylistsSpotify.ts
export async function fetchPlaylistsSpotify() {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`, // Ensure you pass the access token
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch playlists");
    }
  
    const data = await response.json();
    return data.items; // Assuming `items` contains the playlists
  }
  
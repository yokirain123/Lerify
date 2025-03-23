export async function fetchPlaylists(accessToken: string) {
    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.json();
  }
  
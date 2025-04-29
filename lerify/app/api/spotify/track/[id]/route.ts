// /app/api/spotify/track/[id]/route.ts

import { NextResponse } from "next/server";

const SPOTIFY_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN; // ← put your token in .env

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch track" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({
      preview_url: data.preview_url,
      name: data.name,
      artists: data.artists.map((a: any) => a.name).join(", "),
      album: data.album.name,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

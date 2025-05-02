// actions/getSpotifySongs.ts
'use server';

import axios from "axios";
import { Song } from "@/types";

const SPOTIFY_TOKEN_URI = "https://accounts.spotify.com/api/token";
const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

export const getSpotifyAccessToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('Spotify client ID or secret not configured');
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    try {
        const response = await axios.post(SPOTIFY_TOKEN_URI, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw error;
    }
}

export async function fetchTopSpotifyTracks(): Promise<Song[]> {
    try {
        const accessToken = await getSpotifyAccessToken();

        const response = await axios.get(`${SPOTIFY_ENDPOINT}/browse/new-releases`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const albums = response.data.albums.items;

        return albums.map((album: any) => ({
            id: album.id,
            title: album.name,
            author: album.artists[0].name,
            imageUrl: album.images[0]?.url || '',
            previewUrl: album.preview_url || '', // Use the correct preview URL if available
        }));
    } catch (error) {
        console.error('Error fetching Spotify tracks:', error);
        return []; // Or throw error depending on your needs
    }
}


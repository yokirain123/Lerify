"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";

// Define the context type
interface SpotifyContextType {
  fetchSpotifyData: (endpoint: string) => Promise<any>;
}

const SpotifyContext = createContext<SpotifyContextType | null>(null);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      const { data, error } = await supabase
        .from("spotify_tokens")
        .select("access_token, expires_at, refresh_token")
        .single();
      
      if (error) {
        console.error("Error fetching Spotify token:", error);
        return;
      }

      if (data) {
        const { access_token, expires_at, refresh_token } = data;
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (expires_at < currentTime) {
          await refreshAccessToken(refresh_token);
        } else {
          setAccessToken(access_token);
        }
      }
    };

    fetchSpotifyToken();
  }, []);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
      const authHeader = btoa(`${clientId}:${clientSecret}`);
      
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        setAccessToken(data.access_token);
        await supabase
          .from("spotify_tokens")
          .update({
            access_token: data.access_token,
            expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
          })
          .eq("refresh_token", refreshToken);
      }
    } catch (error) {
      console.error("Error refreshing Spotify access token:", error);
    }
  };

  const fetchSpotifyData = async (endpoint: string): Promise<any> => {
    if (!accessToken) return null;

    try {
      const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      return null;
    }
  };

  return (
    <SpotifyContext.Provider value={{ fetchSpotifyData }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};

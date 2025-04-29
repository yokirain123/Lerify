"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react"; // Import NextAuth hooks
import Player from "@/components/Player/Player";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";
import { Song } from "@/types";

export default function SpotifyAuthWrapper() {
  const { data: session, status } = useSession(); // Get session data and loading status
  const router = useRouter();
  const searchParams = useSearchParams();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    try {
      // Sign in with Spotify via NextAuth
      await signIn("spotify");
    } catch (error) {
      console.error("Authorization error:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (session?.accessToken) {
          await fetchSongs(session.accessToken); // Use the session accessToken
        } else {
          // Handle callback if returning from Spotify auth
          const code = searchParams.get("code");
          if (code) {
            // NextAuth should handle the code internally and store the token
            router.replace("/"); // Clear the code from URL
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, searchParams, session]);

  const fetchSongs = async (accessToken: string) => {
    try {
      const response = await fetch("/api/songs", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the access token to fetch songs
        },
      });
      const fetchedSongs = await response.json();
      setSongs(fetchedSongs);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={handleLogin}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login with Spotify"}
        </button>
      </main>
    );
  }

  return (
    <>
      <Header>
        <div className="mb-2 text-5xl text-white font-black py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            Home
          </div>
        </div>
        <ListItem image="/images/like.png" name={"Liked"} href={"liked"} />
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between flex-col">
          <h1 className="text-white font-black text-3xl mb-6">Newest songs</h1>
          <div className="w-full">
            <PageContent songs={songs} />
          </div>
        </div>
      </div>

      <Player />
    </>
  );
}

import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming"
].join(",");

const LOGIN_URL = `https://accounts.spotify.com/authorize?scope=${scopes}`;

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
};

export default NextAuth(authOptions);
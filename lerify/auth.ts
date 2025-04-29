import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend the Session interface to include accessToken
export interface ISession extends Session {
  accessToken?: string;
}

// Extend the JWT interface to include accessToken
interface IJWT extends JWT {
  accessToken?: string;
}

// Uncomment and use this if you want more scopes
// const scopes = [
//   "user-read-email",
//   "playlist-read-private",
//   "playlist-modify-private",
//   "playlist-modify-public",
//   "user-read-private",
//   "user-library-read",
//   "user-library-modify",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "streaming",
//   "user-top-read"
// ].join(" ")

const providers = [
  SpotifyProvider({
    clientId: process.env.AUTH_SPOTIFY_ID!,  // Your Spotify Client ID
    clientSecret: process.env.AUTH_SPOTIFY_SECRET!,  // Your Spotify Client Secret
    authorization: {
      url: "https://accounts.spotify.com/authorize",
      params: { scope: "user-top-read" }  // Use more scopes if needed
    }
  })
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    // JWT callback to store accessToken
    async jwt({ token, account }) {
      if (account?.provider === "spotify") {
        // Store access token and other account information
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    // Session callback to include accessToken in the session
    async session({ session, token }: { session: ISession, token: IJWT }) {
      session.accessToken = token.accessToken;  // Add the accessToken to the session
      return session;
    }
  }
});

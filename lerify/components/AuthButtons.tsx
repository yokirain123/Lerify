'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("spotify");
  };

  const handleLogout = () => {
    signOut();
  };

  if (session) {
    return <button className="text-white" onClick={handleLogout}>Sign Out</button>;
  }

  return <button className="text-white" onClick={handleLogin}>Sign In with Spotify</button>;
}

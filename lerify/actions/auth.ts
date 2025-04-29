'use server';

import { signIn, signOut } from "next-auth/react";

export const login = async (provider: string) => {
  await signIn(provider);
};

export const logout = async () => {
  await signOut();
};

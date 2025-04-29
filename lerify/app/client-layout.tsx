"use client";

import { SessionProvider } from "next-auth/react";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToasterProvider />
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
          {children}
        </UserProvider>
      </SupabaseProvider>
    </SessionProvider>
  );
}

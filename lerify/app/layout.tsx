import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player/Player";
import getSongsByUserId from "@/actions/getSongsByUserId";
import ClientLayout from "@/app/client-layout";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lerify",
  description: "Music Streaming App",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientLayout>
          <Sidebar>
            {children}
          </Sidebar>
          <Player />
        </ClientLayout>
      </body>
    </html>
  );
}

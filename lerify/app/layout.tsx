import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lerify",
  description: "Music Streaming App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}

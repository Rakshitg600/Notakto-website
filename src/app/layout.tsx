import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { VT323 } from 'next/font/google'

export const metadata: Metadata = {
  title: "Notakto",
  description: "No ties, Always a winner",
  keywords: ["Notakto", "misère Tic Tac Toe", "X only", "Tic Tac Toe variant", "retro games", "multiplayer", "AI board game"],
  authors: [{ name: "Notakto Team" }],
  creator: "Notakto Team",
};

const vt323 = VT323({
  weight: "400"
})
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vt323.className}>
      <body>
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}

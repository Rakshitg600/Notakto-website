import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VT323 } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import { CustomToastContainer } from "@/components/ui/CustomToastContainer";

export const metadata: Metadata = {
  title: "Notakto - 8-Bit Edition",
  description: "No ties, Always a winner - Play the retro 8-bit Notakto game",
  keywords: [
    "Notakto",
    "misère Tic Tac Toe",
    "X only",
    "Tic Tac Toe variant",
    "retro games",
    "8-bit",
    "multiplayer",
    "AI board game",
  ],
  authors: [{ name: "Notakto Team" }],
  creator: "Notakto Team",
};

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${pressStart2P.variable}`}>
      <head>
        {/* Google Ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4854199776978392"
          crossOrigin="anonymous"
        ></script>
        {/* Meta tags */}
        <meta
          name="google-site-verification"
          content="lxHtpLX2cDKFEAAabqQ3-9IY-ckiw3KvqM3Z1kNPxRo"
        />
        <meta name="monetag" content="31cbc3974b21341db36f756db33d15d6" />
      </head>
      <body
        className={`${vt323.variable} ${pressStart2P.variable} bg-gray-900 text-white min-h-screen`}
      >
        {/* 🔹 Main Content */}
        <div className="relative w-full">
          {children}
          <CustomToastContainer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}

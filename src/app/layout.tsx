import type { Metadata } from "next";
import { Anton } from "next/font/google";
import localFont from "next/font/local";
import { TopNav } from "@/components/TopNav";
import { ContentShell } from "@/components/ContentShell";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Anton: hero name only. Gambarino: titles. Sora: everything else.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  variable: "--font-gambarino",
  src: "../../public/fonts/Gambarino-Regular.woff2",
  weight: "400",
  display: "swap",
});

const sora = localFont({
  variable: "--font-sora",
  src: "../../public/fonts/Sora-Variable.woff2",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kieran Johnson's Portfolio",
  description:
    "Portfolio of Kieran Johnson, Communications student at RMIT Melbourne specialising in PR, Advertising and Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${gambarino.variable} ${sora.variable} antialiased`}>
        {/* Liquid-glass displacement filter: feTurbulence noise drives a
            feDisplacementMap that bends the backdrop (backdrop-filter: url(#…) in CSS). */}
        <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
          <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="17" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="60" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <SmoothScroll />
        <TopNav />
        <ContentShell>{children}</ContentShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

// Geist — Vercel's clean sans (skiper-ui.com's typeface). One variable face
// used for both body and headings; the heavier weight is applied via .display.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kieran Johnson — Communications",
  description:
    "Portfolio of Kieran Johnson, Communications student at RMIT Melbourne specialising in PR, Advertising and Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        {/* Liquid-glass displacement filter — feTurbulence noise drives a
            feDisplacementMap that bends the backdrop, giving the refracted,
            wobbly edges of real Apple glass (backdrop-filter: url(#…) in CSS). */}
        <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
          <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="17" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="60" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <Preloader />
        <SmoothScroll />
        <TopNav />
        <main>
          <div className="mx-auto max-w-4xl px-5 py-14 md:px-10 md:py-20">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}

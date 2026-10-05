import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { TopNav } from "@/components/TopNav";
import { ContentShell } from "@/components/ContentShell";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Anton: display. Sora: body. IBM Plex Mono: liner-note labels.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
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
      <body className={`${anton.variable} ${plexMono.variable} ${sora.variable} antialiased`}>
        <SmoothScroll />
        <TopNav />
        <ContentShell>{children}</ContentShell>
      </body>
    </html>
  );
}

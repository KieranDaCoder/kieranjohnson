import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Cal Sans — Sidefolio's chunky display face, self-hosted from /public/fonts.
const cal = localFont({
  src: "../../public/fonts/cal-sans.woff2",
  variable: "--font-cal",
  display: "swap",
  weight: "400",
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
      <body className={`${inter.variable} ${cal.variable} antialiased`}>
        <SmoothScroll />
        <div className="md:flex">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="mx-auto max-w-4xl px-5 py-14 md:px-10 md:py-20">
              {children}
              <Footer />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

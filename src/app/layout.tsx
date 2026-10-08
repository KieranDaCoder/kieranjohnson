import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { ContentShell } from "@/components/ContentShell";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kieran Johnson — Junior Strategist",
  description:
    "Portfolio of Kieran Johnson, Communications student at RMIT Melbourne specialising in PR, Advertising and Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} antialiased`}>
        <SiteNav />
        <ContentShell>{children}</ContentShell>
      </body>
    </html>
  );
}

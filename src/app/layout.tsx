import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import "./globals.css";

// One family. Variable, with optical sizing so the huge hero name and the
// body text each get the right cut.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kieranjohnson.vercel.app"),
  title: {
    default: "Kieran Johnson",
    template: "%s | Kieran Johnson",
  },
  description: "Kieran Johnson, Junior Strategist.",
  openGraph: {
    title: "Kieran Johnson",
    description: "Kieran Johnson, Junior Strategist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

// One family. Regular and bold, upright and italic.
const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kieranjohnson.me"),
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
      <body className={`${ptSerif.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-bold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}

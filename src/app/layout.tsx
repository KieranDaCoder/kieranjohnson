import type { Metadata } from "next";
import { Cardo, DM_Sans } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

// Two families: Cardo for display, DM Sans for text and UI.
const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
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
      <body className={`${cardo.variable} ${dmSans.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-sans font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}

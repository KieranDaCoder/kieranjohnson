"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

// The home page runs full-bleed (hero + blocks); inner pages keep a centred column.
export function ContentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <main>{children}</main>;
  }

  return (
    <main>
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-10 md:py-20">
        {children}
        <Footer />
      </div>
    </main>
  );
}

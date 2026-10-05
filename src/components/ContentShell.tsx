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
      <div className="mx-auto max-w-4xl px-5 pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:px-10 md:pb-20 md:pt-[calc(var(--nav-h)+5rem)]">
        {children}
        <Footer />
      </div>
    </main>
  );
}

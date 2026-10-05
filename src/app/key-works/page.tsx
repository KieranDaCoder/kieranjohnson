import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { KeyWorks } from "@/components/KeyWorks";

export const metadata: Metadata = {
  title: "Key Works · Kieran Johnson",
  description: "Three projects Kieran Johnson would put on first.",
};

export default function KeyWorksPage() {
  return (
    <>
      <header className="mb-12">
        <Reveal>
          <p className="mono-label text-ink-muted">SIDE A</p>
          <h1 className="display mt-3 text-ink [font-size:clamp(3rem,7vw,6.5rem)]">KEY WORKS</h1>
          <p className="mt-4 max-w-[60ch] text-base text-ink-muted">
            Three projects I&apos;d put on first.
          </p>
        </Reveal>
      </header>
      <KeyWorks standalone />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import Link from "next/link";
import { getAbout, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Kieran Johnson.",
};

export default function AboutPage() {
  const paragraphs = getAbout();
  const norm = (t: string) => t.replace(/[’']/g, "'").toLowerCase();
  const slugs = new Map(getProjects().map((p) => [norm(p.title), p.slug]));

  // **Bold** names in about.md become links to the matching project, if there is one.
  const render = (text: string) =>
    text.split(/\*\*(.+?)\*\*/).map((part, i) => {
      if (i % 2 === 0) return part;
      const slug = slugs.get(norm(part));
      return slug ? (
        <Link key={i} href={`/work/${slug}`} className="font-semibold underline underline-offset-4">
          {part}
        </Link>
      ) : (
        <strong key={i}>{part}</strong>
      );
    });

  return (
    <>
      <PageHeader title="About" />
      <Section tone="white" className="gutter pb-20 pt-10 md:pb-40 md:pt-14">
        <div className="grid gap-12 md:grid-cols-[minmax(0,720px)_minmax(0,1fr)] md:gap-24">
          {/* Portrait above the text on phone, sticky beside it on desktop. */}
          <div className="md:order-2">
            <div className="relative aspect-[3/4] w-full max-w-[320px] md:sticky md:top-28 md:max-w-[420px]">
              <Image
                src="/images/kieran-portrait-3x4.jpg"
                alt="Kieran Johnson"
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="t-body space-y-6 md:order-1">
            {paragraphs.map((p, i) => (
              <p key={i}>{render(p)}</p>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

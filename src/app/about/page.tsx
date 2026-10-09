import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Kieran Johnson.",
};

export default function AboutPage() {
  const paragraphs = getAbout();

  return (
    <>
      <PageHeader title="About" />
      <Section tone="white" className="gutter pb-20 pt-10 md:pb-40 md:pt-14">
        <div className="grid gap-12 md:grid-cols-[minmax(0,720px)_minmax(0,1fr)] md:gap-24">
          {/* Portrait above the text on phone, sticky beside it on desktop. */}
          <div className="md:order-2">
            <div className="relative aspect-[3/4] w-full max-w-[320px] md:sticky md:top-28 md:max-w-[420px]">
              <Image
                src="/images/portrait-large.jpg"
                alt="Kieran Johnson"
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="t-body space-y-6 md:order-1">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

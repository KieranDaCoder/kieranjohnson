import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { HeroName } from "@/components/HeroName";
import { RevealTitle } from "@/components/RevealTitle";
import { Reveal } from "@/components/Reveal";
import { SnapSettle } from "@/components/SnapSettle";
import { WorkCarousel } from "@/components/WorkCarousel";
import { ContactList } from "@/components/ContactList";
import { getContacts, getHome, getProjects } from "@/lib/content";

// Section heading band: the (trimmed) heading sits evenly between the fixed nav
// (extra top padding on desktop clears it) and the content below,
// button centred on it. No lines on the home page.
function HeadingRow({
  children,
  cta,
  className = "",
}: {
  children: React.ReactNode;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between md:gap-6 md:pb-10 md:pt-24 ${className}`}
    >
      {children}
      {cta && (
        <Link href={cta.href} className="btn max-md:min-h-11 max-md:px-5 max-md:py-3 max-md:text-[0.9375rem]">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const home = getHome();
  const projects = getProjects().map(({ slug, title, category, year, tile, alt }) => ({
    slug,
    title,
    category,
    year,
    tile,
    alt,
  }));
  const contacts = getContacts();
  const linkedin = contacts.find((c) => c.platform === "LinkedIn");

  return (
    <>
      <Reveal />
      <SnapSettle />
      {/* Hero: text only, name at the bottom left. */}
      <Section
        tone="black"
        id="home"
        className="gutter relative flex min-h-svh flex-col justify-end pb-16 pt-32 md:pb-24"
      >
        <HeroName usp={home.usp} />
      </Section>

      {/* About */}
      <Section tone="white" id="about" reveal className="anchor-section gutter screen-section pb-20 md:pb-28">
        <HeadingRow cta={{ label: "More about me", href: "/about" }}>
          <RevealTitle as="h2" className="t-h2">About me</RevealTitle>
        </HeadingRow>
        <div className="screen-fill">
        <div className="grid gap-12 pt-10 md:grid-cols-[1fr_auto] md:gap-24 md:pt-14">
          <div>
            <p className="t-lead" data-reveal>
              {home.coreInfo}
            </p>
          </div>
          <div className="relative size-40 md:size-60" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <Image
              src="/images/portrait-small.jpg"
              alt="Kieran Johnson"
              fill
              sizes="(max-width: 768px) 160px, 240px"
              className="object-cover"
            />
          </div>
        </div>
        </div>
      </Section>

      {/* Work */}
      <Section tone="black" id="work" reveal className="anchor-section screen-section pb-20 md:pb-28">
        <HeadingRow cta={{ label: "See all work", href: "/work" }} className="gutter">
          <RevealTitle as="h2" className="t-h2">My work</RevealTitle>
        </HeadingRow>
        <div className="screen-fill">
          <div data-reveal>
            <WorkCarousel projects={projects} />
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section tone="white" id="contact" reveal className="anchor-section gutter screen-section pb-20 md:pb-28">
        <HeadingRow className="pb-0 md:pb-0">
          <RevealTitle as="h2" className="t-h2">Contact</RevealTitle>
        </HeadingRow>
        <div className="screen-fill">
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 lg:gap-24">
            <div>
              <p className="t-body mt-8 max-w-[34em] md:mt-10" data-reveal>
                {home.contactLine}
              </p>
              <div className="mt-10 md:mt-12" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                <ContactList links={contacts} />
              </div>
            </div>
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="qr-code block shrink-0"
                data-reveal
                style={{ "--i": 2 } as React.CSSProperties}
              >
                <Image
                  src="/images/linkedin-qr.png"
                  alt="QR code for LinkedIn"
                  width={500}
                  height={500}
                  // Serve the original file: lossy resizing softens the dots and hurts scanning.
                  unoptimized
                  className="size-full"
                />
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { WorkCarousel } from "@/components/WorkCarousel";
import { ContactList } from "@/components/ContactList";
import { getContacts, getHome, getProjects } from "@/lib/content";

function HeadingRow({
  children,
  cta,
}: {
  children: React.ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-8">
      {children}
      {cta && (
        <Link href={cta.href} className="btn">
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

  return (
    <>
      {/* Hero: text only, name at the bottom left. */}
      <Section
        tone="black"
        id="home"
        className="gutter relative flex min-h-svh flex-col justify-end pb-16 pt-32 md:pb-24"
      >
        <h1 className="t-hero">
          <span className="rise block">KIERAN</span>
          <span className="rise block [animation-delay:80ms]">JOHNSON</span>
        </h1>
        <p className="t-label rise mt-6 [animation-delay:200ms] md:mt-8">Junior Strategist</p>
        <a
          href="#about"
          className="t-label absolute bottom-16 right-4 hidden md:bottom-24 md:right-12 md:block xl:right-16"
        >
          Scroll
        </a>
      </Section>

      {/* About */}
      <Section tone="white" id="about" className="gutter py-16 md:py-32">
        <HeadingRow cta={{ label: "More about me", href: "/about" }}>
          <h2 className="t-label">About me</h2>
        </HeadingRow>
        <div className="mt-12 grid gap-12 border-t border-line pt-12 md:mt-16 md:grid-cols-[1fr_auto] md:gap-24 md:pt-16">
          <div className="max-w-[820px]">
            <p className="t-h2">{home.usp}</p>
            <p className="t-body mt-8 max-w-[640px]">{home.coreInfo}</p>
          </div>
          <div className="relative size-40 md:size-60">
            <Image
              src="/images/portrait-small.jpg"
              alt="Kieran Johnson"
              fill
              sizes="(max-width: 768px) 160px, 240px"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Work */}
      <Section tone="black" id="work" className="py-16 md:py-32">
        <div className="gutter mb-12 md:mb-16">
          <HeadingRow cta={{ label: "See all work", href: "/work" }}>
            <h2 className="t-h2">My work</h2>
          </HeadingRow>
        </div>
        <WorkCarousel projects={projects} />
      </Section>

      {/* Contact */}
      <Section tone="white" id="contact" className="gutter py-16 md:py-32">
        <h2 className="t-h2">Contact</h2>
        <p className="t-body mt-6 max-w-[640px]">{home.contactLine}</p>
        <div className="mt-12 md:mt-16">
          <ContactList links={contacts} />
        </div>
      </Section>
    </>
  );
}

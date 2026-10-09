import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { HeroName } from "@/components/HeroName";
import { WorkCarousel } from "@/components/WorkCarousel";
import { ContactList } from "@/components/ContactList";
import { getContacts, getHome, getProjects } from "@/lib/content";

// Section heading band: equal space above and below the (trimmed) heading,
// button centred on it, optional hairline underneath.
function HeadingRow({
  children,
  cta,
  line = true,
  className = "",
}: {
  children: React.ReactNode;
  cta?: { label: string; href: string };
  line?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-10 md:gap-6 md:py-14 ${line ? "border-b border-line" : ""} ${className}`}
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

  return (
    <>
      {/* Hero: text only, name at the bottom left. */}
      <Section
        tone="black"
        id="home"
        className="gutter relative flex min-h-svh flex-col justify-end pb-16 pt-32 md:pb-24"
      >
        <HeroName />
      </Section>

      {/* About */}
      <Section tone="white" id="about" className="gutter anchor-section screen-section pb-20 md:pb-28">
        <HeadingRow cta={{ label: "More about me", href: "/about" }}>
          <h2 className="t-h2">About me</h2>
        </HeadingRow>
        <div className="screen-fill">
        <div className="grid gap-12 pt-10 md:grid-cols-[1fr_auto] md:gap-24 md:pt-14">
          <div>
            <p className="t-statement">{home.usp}</p>
            <p className="t-body mt-8 max-w-[34em]">{home.coreInfo}</p>
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
        </div>
      </Section>

      {/* Work */}
      <Section tone="black" id="work" className="anchor-section screen-section pb-20 md:pb-28">
        <HeadingRow cta={{ label: "See all work", href: "/work" }} className="gutter">
          <h2 className="t-h2">My work</h2>
        </HeadingRow>
        <div className="screen-fill">
          <WorkCarousel projects={projects} />
        </div>
      </Section>

      {/* Contact */}
      <Section tone="white" id="contact" className="gutter anchor-section screen-section pb-20 md:pb-28">
        <HeadingRow line={false} className="pb-0 md:pb-0">
          <h2 className="t-h2">Contact</h2>
        </HeadingRow>
        <div className="screen-fill">
          <p className="t-body mt-8 max-w-[34em] md:mt-10">{home.contactLine}</p>
          <div className="mt-10 md:mt-12">
            <ContactList links={contacts} />
          </div>
        </div>
      </Section>
    </>
  );
}

import Image from "next/image";
import { Hero } from "@/components/Hero";
import { RowHeader } from "@/components/RowHeader";
import { WorkCarousel } from "@/components/WorkCarousel";
import { projects } from "@/lib/projects";
import { contactLinks } from "@/lib/contact";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="fade-in">
        {/* ---------- About me ---------- */}
        <section id="content" className="hairline px-6 py-10 md:px-16 md:py-16">
          <RowHeader title="About me" cta={{ label: "More about me", href: "/about" }} />
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-2xl font-semibold md:text-3xl">[PLACEHOLDER: Kieran to write]</p>
              <p className="t-body mt-6">[PLACEHOLDER: Kieran to write]</p>
            </div>
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/profile/kieran.jpg"
                alt="Kieran Johnson"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------- My work ---------- */}
        <section className="hairline">
          <div className="px-6 py-10 md:px-16 md:py-16">
            <RowHeader title="My work" cta={{ label: "More of my work", href: "/work" }} />
          </div>
          <WorkCarousel projects={projects} />
        </section>

        {/* ---------- Contact ---------- */}
        <section className="hairline px-6 py-10 md:px-16 md:py-16">
          <RowHeader title="Contact" cta={{ label: "Connect with me", href: "/contact" }} />
          <p className="t-body mt-10">[PLACEHOLDER: Kieran to write]</p>
          <div className="mt-6 flex flex-wrap gap-6">
            {contactLinks.map(({ href, label, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 t-body"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" aria-hidden="true" className="h-5 w-5" />
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

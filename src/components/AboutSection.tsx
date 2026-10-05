import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const proof = [
  { label: "MACPAC", line: "Trainer and Key Holder" },
  { label: "WHITTLESEA CREATIVE", line: "Admin" },
  { label: "RMIT", line: "HD projects" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      data-section="about"
      className="paper-grain relative bg-paper px-6 py-24 md:px-10 md:py-32"
    >
      <div className="lg:max-w-[62vw]">
        <SectionHeader label="03 / LOCATED IN MELBOURNE" title="ABOUT ME" />
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_minmax(0,18rem)] md:items-start md:gap-12">
          <Reveal delay={0.05}>
            <p className="max-w-[60ch] text-base italic leading-relaxed text-ink-muted">
              [Placeholder: Kieran is writing a new About paragraph.]
            </p>
            <p className="mono-label mt-6 text-ink-muted">[Status line coming soon]</p>
            <ul className="mt-10 grid border-y border-line max-sm:divide-y max-sm:divide-line sm:grid-cols-3 sm:divide-x sm:divide-line">
              {proof.map((item) => (
                <li key={item.label} className="py-4 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                  <p className="mono-label text-ink-muted">{item.label}</p>
                  <p className="mt-2 text-[15px] text-ink">{item.line}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <figure className="relative z-30 max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile/kieran.jpg"
                alt="Portrait of Kieran Johnson"
                className="aspect-[4/5] w-full rounded-xl border border-line object-cover"
              />
              <figcaption className="mono-label mt-2 text-[10px] text-ink-muted">
                PORTRAIT: INTERIM
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

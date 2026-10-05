import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { KeyWorkSticker } from "@/components/KeyWorkCard";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/projects";

export function Crate() {
  return (
    <section
      id="crate"
      data-section="crate"
      className="paper-grain relative bg-paper px-6 py-24 md:px-10 md:py-32"
    >
      <SectionHeader label="02 / THE CRATE" title="SIDE B: THE CRATE" />
      <Reveal delay={0.05}>
        <p className="mt-6 max-w-[70ch] text-base text-ink-muted lg:max-w-[min(70ch,62vw)]">
          Every project, from campaign strategy to product builds.
        </p>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.06} className="h-full">
            <Link
              href={`/work/${p.slug}`}
              className="group relative z-30 flex h-full flex-col rounded-xl border border-line bg-paper-2 p-3 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber hover:shadow-[0_0_0_2px_var(--color-amber)] focus-visible:-translate-y-1 focus-visible:border-amber focus-visible:shadow-[0_0_0_2px_var(--color-amber)]"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                {p.keyWork ? (
                  <KeyWorkSticker className="absolute -right-2 -top-2 h-12 w-12 !text-[7px]" />
                ) : null}
              </div>
              <p className="mono-label mt-3 text-ink-muted">
                {p.category} · {p.year}
              </p>
              <h3 className="display mt-2 text-[1.4rem] text-ink">{p.title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="relative z-30 mt-12">
        <Button variant="secondary" href="/work">
          Open the crate
        </Button>
      </Reveal>
    </section>
  );
}

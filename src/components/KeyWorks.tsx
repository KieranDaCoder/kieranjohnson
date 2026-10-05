import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { KeyWorkCard } from "@/components/KeyWorkCard";
import { Button } from "@/components/ui/Button";
import { keyWorks } from "@/lib/projects";

function Grid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {keyWorks.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.08} className="h-full">
          <KeyWorkCard project={p} />
        </Reveal>
      ))}
    </div>
  );
}

export function KeyWorks({ standalone = false }: { standalone?: boolean }) {
  if (standalone) return <Grid />;
  return (
    <section
      id="key-works"
      data-section="key-works"
      className="paper-grain relative bg-paper px-6 py-20 md:px-10 md:py-24"
    >
      <SectionHeader label="01 / KEY WORKS" title="SIDE A: KEY WORKS" />
      <div className="mt-12 md:mt-16">
        <Grid />
      </div>
      <Reveal className="relative z-30 mt-12">
        <Button variant="secondary" href="/key-works">
          Full tracklist on the Key Works page
        </Button>
      </Reveal>
    </section>
  );
}

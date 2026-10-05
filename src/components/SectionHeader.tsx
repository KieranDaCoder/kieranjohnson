import { Reveal } from "@/components/Reveal";

// Shared section opener: mono label over a big display heading.
export function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <Reveal>
      <p className="mono-label text-ink-muted">{label}</p>
      <h2 className="display mt-4 text-ink [font-size:clamp(3rem,7vw,6.5rem)]">{title}</h2>
    </Reveal>
  );
}

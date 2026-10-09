import { Section } from "@/components/Section";

// Black header block that opens every inner page.
export function PageHeader({ title, meta }: { title: string; meta?: string[] }) {
  return (
    <Section tone="black" as="header" className="gutter pb-16 pt-40 md:pb-24 md:pt-56">
      {meta && meta.length > 0 && (
        <p className="t-label mb-6 flex flex-wrap gap-x-6 gap-y-2">
          {meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </p>
      )}
      <h1 className="t-page-title rise max-w-[16ch]">{title}</h1>
    </Section>
  );
}

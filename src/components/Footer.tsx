import { Section } from "@/components/Section";
import { getHome } from "@/lib/content";

export function Footer() {
  const { usp } = getHome();
  return (
    <Section tone="black" as="footer" className="gutter py-20 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-title">Kieran Johnson</p>
          <p className="t-body mt-2 max-w-[34em]">{usp}</p>
        </div>
        <p className="t-meta">© {new Date().getFullYear()}</p>
      </div>
    </Section>
  );
}

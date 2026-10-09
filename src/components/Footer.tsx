import { Section } from "@/components/Section";
import { getHome } from "@/lib/content";

export function Footer() {
  const { usp } = getHome();
  return (
    <Section tone="black" as="footer" className="gutter py-16 md:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="t-title">Kieran Johnson</p>
          <p className="mt-2 max-w-[640px] text-base leading-normal">{usp}</p>
        </div>
        <p className="t-label font-normal">© {new Date().getFullYear()}</p>
      </div>
    </Section>
  );
}

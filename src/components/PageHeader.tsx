import { Reveal, RevealText } from "@/components/Reveal";

// Sidefolio page opener: an emoji glyph, a big Cal Sans title, optional intro.
export function PageHeader({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header>
      <Reveal>
        <span className="block text-3xl md:text-4xl">{emoji}</span>
      </Reveal>
      <RevealText
        text={title}
        delay={0.05}
        className="display mt-3 text-4xl text-charcoal md:text-5xl"
      />
      {children ? (
        <Reveal delay={0.15} className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {children}
        </Reveal>
      ) : null}
    </header>
  );
}

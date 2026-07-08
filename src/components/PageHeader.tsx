import { Reveal, RevealText } from "@/components/Reveal";

// Sidefolio page opener: a pixel-art icon, a big Geist display title, optional intro.
export function PageHeader({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header>
      <Reveal>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-10 w-10 [image-rendering:pixelated] md:h-12 md:w-12"
        />
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

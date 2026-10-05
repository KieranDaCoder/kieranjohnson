import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { contactLinks } from "@/lib/contact";

export function ContactSection() {
  const email = contactLinks.find((l) => l.label === "Email")?.href ?? "mailto:";
  const linkedin = contactLinks.find((l) => l.label === "LinkedIn")?.href ?? "#";
  return (
    <section
      id="contact"
      data-section="contact"
      className="paper-grain relative flex min-h-[60svh] flex-col justify-center bg-paper px-6 py-20 md:px-10 md:py-24"
    >
      <div className="lg:max-w-[62vw]">
        <Reveal>
          <p className="mono-label text-ink-muted">04 / SAY HELLO</p>
          <h2 className="display mt-4 text-ink [font-size:clamp(4rem,12vw,11rem)]">SAY HELLO</h2>
          <p className="mt-6 max-w-[60ch] text-base text-ink-muted">
            Open to PR and advertising work. Email is fastest.
          </p>
          <div className="relative z-30 mt-8 flex flex-wrap gap-3">
            <Button variant="primary" href={email}>
              Email me
            </Button>
            <Button variant="secondary" href={linkedin} external>
              LinkedIn ↗
            </Button>
            <Button variant="secondary" href="/KieranJohnson_Resume.pdf" external>
              Résumé ↗
            </Button>
          </div>
          <p
            id="tour-end-note"
            aria-live="polite"
            className="mono-label mt-8 min-h-[1em] text-ink-muted"
          />
        </Reveal>
      </div>
    </section>
  );
}

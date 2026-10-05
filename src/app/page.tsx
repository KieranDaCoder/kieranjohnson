import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FadeSection } from "@/components/FadeSection";
import { Footer } from "@/components/Footer";
import { contactLinks } from "@/lib/contact";

const primaryButton =
  "inline-flex min-h-12 items-center gap-2 rounded-full bg-charcoal px-7 text-base font-medium text-white transition-opacity hover:opacity-85";
const secondaryButton =
  "inline-flex min-h-12 items-center gap-2 rounded-full border border-charcoal/25 px-7 text-base font-medium text-charcoal transition-colors hover:bg-surface";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="content" className="bg-bg px-6 md:px-10">
        {/* ---------- About me ---------- */}
        <FadeSection className="flex min-h-[80svh] items-center py-20">
          <div className="grid w-full gap-10 border-t border-hairline pt-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <div>
              <p className="caption text-muted">Located in Melbourne</p>
              <h2 className="display mt-4 text-6xl md:text-8xl">About me</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-xl font-light leading-snug md:text-3xl">
              <p>
                I&apos;m a Communications student at RMIT Melbourne, double majoring in PR &amp;
                Advertising. Whether you want your brand in the headlines or need to keep it out of
                them, I&apos;m your guy.
              </p>
              <p>
                I&apos;m currently looking for an internship where I can turn strategy into work
                that actually moves people. I&apos;ve got the case studies to back it up.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <Link href="/work" className={primaryButton}>
                  See my work →
                </Link>
                <Link href="/about" className={secondaryButton}>
                  More about me
                </Link>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ---------- Let's talk ---------- */}
        <FadeSection className="flex min-h-[80svh] items-center py-20">
          <div className="grid w-full gap-10 border-t border-hairline pt-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <div>
              <p className="caption text-muted">Open to opportunities</p>
              <h2 className="display mt-4 text-6xl md:text-8xl">Let&apos;s talk</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-xl font-light leading-snug md:text-3xl">
              <p>Open to internships and opportunities in PR &amp; Advertising.</p>
              <div className="flex flex-wrap gap-3 pt-4">
                {contactLinks.map(({ href, label, icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={secondaryButton}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" aria-hidden="true" className="h-4 w-4 [image-rendering:pixelated]" />
                    {label}
                  </a>
                ))}
                <Link href="/work" className={primaryButton}>
                  See my work →
                </Link>
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="pb-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

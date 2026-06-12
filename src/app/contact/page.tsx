import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact — Kieran Johnson",
  description: "Get in touch with Kieran Johnson.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-36 md:px-12">
      <RevealText
        text="Let's talk."
        className="display text-7xl text-charcoal md:text-9xl"
      />
      <Reveal delay={0.3}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal/70">
          Open to internships, freelance briefs and good conversations about campaigns.
          The fastest way to reach me is email.
        </p>
      </Reveal>

      <div className="mt-16 space-y-8">
        <Reveal delay={0.4}>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Email</p>
          <a
            href="mailto:kieranjohnson262@gmail.com"
            className="display mt-2 inline-block text-3xl text-charcoal transition-colors hover:text-accent md:text-5xl"
          >
            kieranjohnson262@gmail.com
          </a>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/kieran-johnson-28b372359/"
            target="_blank"
            rel="noopener noreferrer"
            className="display mt-2 inline-block text-3xl text-charcoal transition-colors hover:text-accent md:text-5xl"
          >
            linkedin.com/in/kieran-johnson
          </a>
        </Reveal>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Writing — Kieran Johnson",
  description: "Notes and articles by Kieran Johnson.",
};

// Filler — replace with real posts (or wire up MDX) when you start writing.
const posts = [
  {
    title: "Filler article — why one clear ask beats thirty",
    excerpt:
      "Placeholder excerpt. A short intro to the piece so readers know what they're getting into.",
    date: "Coming soon",
  },
  {
    title: "Filler article — humour as a strategic choice in advertising",
    excerpt:
      "Placeholder excerpt. Two sentences that tee up the argument and make someone want to click.",
    date: "Coming soon",
  },
  {
    title: "Filler article — earned vs paid, and where they meet",
    excerpt:
      "Placeholder excerpt. Set up the tension and hint at where the piece lands.",
    date: "Coming soon",
  },
];

export default function WritingPage() {
  return (
    <>
      <PageHeader emoji="✍️" title="Writing">
        Notes on campaigns, strategy and the craft of persuasion. Filler entries for now — real
        posts on the way.
      </PageHeader>

      <div className="mt-12 flex flex-col divide-y divide-hairline">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={Math.min(i * 0.08, 0.3)}>
            <article className="group cursor-default py-6">
              <p className="text-xs text-muted">{post.date}</p>
              <h2 className="display mt-1 text-lg text-charcoal">{post.title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}

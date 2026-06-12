// Edit this file to update your portfolio. Each project becomes a card on
// /work and its own case study page at /work/<slug>.

export type Project = {
  slug: string;
  title: string;
  category: "PR Strategy" | "Advertising" | "Campaign Analysis" | "Brand Strategy";
  description: string;
  year: string;
  // Card artwork — swap the placeholder SVGs in /public/placeholders for
  // real campaign images (any image path under /public works).
  image: string;
  // Case study content — swap these placeholders for your real work.
  overview: string;
  role: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "PR Strategy",
    description:
      "A short, punchy description of the brief and what you delivered. Two sentences max.",
    year: "2026",
    image: "/placeholders/p1.svg",
    overview:
      "Placeholder overview. Describe the client, the brief, and the challenge in a paragraph or two. What was the situation, and what needed to change?",
    role: "Strategy, media relations, copywriting — list what you actually did.",
    outcome:
      "Placeholder outcome. Lead with the result: coverage secured, engagement lifted, perception shifted. Numbers if you have them.",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Advertising",
    description:
      "A short, punchy description of the brief and what you delivered. Two sentences max.",
    year: "2026",
    image: "/placeholders/p2.svg",
    overview:
      "Placeholder overview. Describe the campaign concept, the audience insight it was built on, and the creative idea.",
    role: "Concept development, art direction, campaign planning.",
    outcome:
      "Placeholder outcome. What did the work achieve, and what did you learn from it?",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Campaign Analysis",
    description:
      "A short, punchy description of the brief and what you delivered. Two sentences max.",
    year: "2025",
    image: "/placeholders/p3.svg",
    overview:
      "Placeholder overview. Set up the campaign you analysed and the question you set out to answer.",
    role: "Research, data analysis, strategic recommendations.",
    outcome:
      "Placeholder outcome. Summarise your key findings and the recommendations that came out of them.",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "Brand Strategy",
    description:
      "A short, punchy description of the brief and what you delivered. Two sentences max.",
    year: "2025",
    image: "/placeholders/p4.svg",
    overview:
      "Placeholder overview. Walk through the brand challenge and the positioning work you did.",
    role: "Brand audit, positioning, messaging framework.",
    outcome:
      "Placeholder outcome. How did the strategy land, and what changed because of it?",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

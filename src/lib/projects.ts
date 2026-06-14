// Edit this file to update your portfolio. Each project becomes a card on
// /work and its own case study page at /work/<slug>.

// A single copy concept, shown as a recreated web-banner mockup.
export type CopyBanner = { headline: string; subline: string };

// Rich case-study content. When a project has this, its page renders the
// full gallery layout instead of the simple overview/role/outcome layout.
export type CaseStudy = {
  discipline: string; // e.g. "Advertising Campaign — Removery"
  result: string; // e.g. "RMIT University, Advertising Concepts. High Distinction."
  executions: { src: string; alt: string }[]; // final posters, shown large
  conceptBanners: CopyBanner[]; // recreated copy-only concepts
  developmentImage: string; // sketch-to-final progression sheet
  body: string[]; // paragraphs, in order
};

export type Project = {
  slug: string;
  title: string;
  category: "PR Strategy" | "Advertising" | "Campaign Analysis" | "Brand Strategy";
  description: string;
  year: string;
  // Card artwork — swap the placeholder SVGs in /public/placeholders for
  // real campaign images (any image path under /public works).
  image: string;
  // Optional: a row of images for the card (e.g. a triptych). Overrides `image`
  // on the card when set.
  thumbnailImages?: string[];
  // Case study content — swap these placeholders for your real work.
  overview: string;
  role: string;
  outcome: string;
  // Optional rich case study. When present, the page uses the gallery layout.
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "tattoos-dont-age-well",
    title: "Tattoos Don't Age Well",
    category: "Advertising",
    description:
      "A print campaign for the world's largest tattoo removal company. The idea: keep the tattoo, age the person wearing it.",
    year: "2026",
    image: "/work/removery/execution-1.png",
    thumbnailImages: [
      "/work/removery/execution-1.png",
      "/work/removery/execution-2.png",
      "/work/removery/execution-3.png",
    ],
    overview:
      "Removery is the world's largest tattoo removal company. The brief was open: communicate what the brand does and why someone might need it. The concept — keep the tattoo, age the person wearing it.",
    role: "Concept, copywriting, art direction, illustration.",
    outcome: "RMIT University, Advertising Concepts. High Distinction.",
    caseStudy: {
      discipline: "Advertising Campaign — Removery",
      result: "RMIT University, Advertising Concepts. High Distinction.",
      executions: [
        {
          src: "/work/removery/execution-1.png",
          alt: "Elderly woman gripping a walking frame, 'Daddy's Lil Girl' tattooed across her lower back",
        },
        {
          src: "/work/removery/execution-2.png",
          alt: "Elderly person bent over a toilet, 'Young, Wild & Free' tattooed across their back",
        },
        {
          src: "/work/removery/execution-3.png",
          alt: "Elderly man on a mobility scooter, 'Live Fast Die Young' tattooed on his forearm",
        },
      ],
      conceptBanners: [
        {
          headline: "Live Fast, Die Young.",
          subline: "Awkward when you're 80 and still kicking.",
        },
        {
          headline: "Young, Wild & Free.",
          subline: "Less believable when you need help wiping your butt.",
        },
        {
          headline: "Daddy's Little Girl.",
          subline: "Doesn't help at custody hearings.",
        },
      ],
      developmentImage: "/work/removery/development.png",
      body: [
        "Removery is the world's largest tattoo removal company. The brief was open: communicate what the brand does and why someone might need it. No prescribed angle, no locked-in audience, no mandated tone.",
        "That openness created a real problem. Why do people remove tattoos? Regret, career change, relationship breakdown — every obvious answer leads to the same emotional territory. So the thinking went elsewhere. Keep the tattoo. Age the person wearing it.",
        "The concept came from tattoo clichés: Live Fast Die Young. Young, Wild and Free. Daddy's Little Girl. Phrases that make sense at 21 and become unintentionally hilarious at 80. The first executions were copy-only web banners — “Live Fast, Die Young. Awkward when you're 80 and still kicking.” “Less believable when you need help wiping your butt.”",
        "When the brief extended to a visual print campaign, the images took over from the words. Three posters, each showing an elderly person in an ordinary situation with an ironic tattoo on display. An old woman gripping a walking frame, “Daddy's Lil Girl” across her lower back. An elderly man on a mobility scooter, “Live Fast Die Young” on his forearm. A third figure bent over a toilet, “Young, Wild and Free” across their back.",
        "TATTOOS DON'T AGE WELL runs across all three executions. DON'T is red. Everything else is black on cream. Humour was a strategic call — funny ads get processed more deeply and recalled more readily than fear-based ones, and for a brand selling something people feel embarrassed about, a laugh lowers the barrier before the message lands.",
        "All three illustrations were built in Photoshop through iterative scamping, from rough placement sketches to coloured finals.",
      ],
    },
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

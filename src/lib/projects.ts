// Edit this file to update your portfolio. Each project becomes a card on
// /work and its own case study page at /work/<slug>.

// A single copy concept, shown as a recreated web-banner mockup.
export type CopyBanner = { headline: string; subline: string };

// Rich creative case study (e.g. an ad campaign): final executions, scamps,
// concept banners and a development process. Renders the gallery layout.
export type CreativeCaseStudy = {
  kind: "creative";
  discipline: string; // e.g. "Advertising Campaign — Removery"
  result: string; // e.g. "RMIT University, Advertising Concepts. High Distinction."
  executions: { src: string; alt: string }[]; // final posters, shown large
  scamps: string[]; // original handwritten copy scamps (image paths)
  conceptBanners: CopyBanner[]; // refined copy-only web banners
  developmentRows: { src: string; label: string }[]; // per-execution progression strips
  body: string[]; // paragraphs, in order
};

// Analytical / strategy case study (e.g. a campaign critique): a lead
// pullquote, labelled prose sections, and the materials that were analysed.
export type AnalysisCaseStudy = {
  kind: "analysis";
  discipline: string; // e.g. "PR Strategy — Alliance for Gambling Reform"
  result: string; // e.g. "RMIT University, Advocacy and Voice in PR. High Distinction."
  pullquote: string; // large opening statement
  sections: { heading: string; body: string[] }[]; // labelled prose blocks
};

// When a project has a caseStudy, its page renders the matching rich layout
// instead of the simple overview/role/outcome layout.
export type CaseStudy = CreativeCaseStudy | AnalysisCaseStudy;

export type Project = {
  slug: string;
  title: string;
  category: "PR Strategy" | "Advertising" | "Campaign Analysis" | "Brand Strategy" | "Product Build";
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
    slug: "summit-signal",
    title: "Summit Signal",
    category: "Product Build",
    description:
      "A media-trend and consumer-sentiment dashboard for the outdoor & adventure gear niche, turning social chatter into brand-ready insight with an AI pipeline.",
    year: "2026",
    // ponytail: no product screenshot yet — swap for a real dashboard capture once the pipeline's live.
    image: "/placeholders/p1.svg",
    overview:
      "Built to track the outdoor gear category's shift from purely functional positioning (\"waterproof, breathable, 20L\") to lifestyle/fashion positioning (\"gorpcore\"). A scheduled pipeline ingests RSS, Reddit and YouTube chatter, tags sentiment with Claude Haiku, and synthesizes weekly Trend Cards and reports with Claude Opus — visitors only ever read pre-computed insight, never raw data.",
    role: "Product design, full-stack build (Next.js, Postgres/Supabase), AI pipeline architecture.",
    outcome:
      "A fully built, end-to-end dashboard (Overview, Trends, Brands, Reports) demonstrating applied AI for market insight, not just a metrics dashboard.",
  },
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
      kind: "creative",
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
      scamps: [
        "/work/removery/scamp-1.png",
        "/work/removery/scamp-2.png",
        "/work/removery/scamp-3.png",
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
      developmentRows: [
        { src: "/work/removery/dev-row-1.png", label: "Daddy's Lil Girl" },
        { src: "/work/removery/dev-row-2.png", label: "Young, Wild & Free" },
        { src: "/work/removery/dev-row-3.png", label: "Live Fast Die Young" },
      ],
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
    slug: "end-gambling-ads",
    title: "End Gambling Ads",
    category: "PR Strategy",
    description:
      "A strategic critique of the Alliance for Gambling Reform's advocacy campaign — and two recommendations to give it real political leverage.",
    year: "2026",
    image: "/work/agr/cover.png",
    overview:
      "A critical analysis of the Alliance for Gambling Reform's 'End Gambling Ads' campaign, identifying why a 31-point ask let the government do just enough — and how a single demand plus minor-party registration would force change.",
    role: "Campaign analysis, strategic recommendations, advocacy theory.",
    outcome: "RMIT University, Advocacy and Voice in Public Relations. High Distinction.",
    caseStudy: {
      kind: "analysis",
      discipline: "PR Strategy — Alliance for Gambling Reform",
      result:
        "RMIT University, Advocacy and Voice in Public Relations. Individual assessment. High Distinction.",
      pullquote:
        "I receive over ten gambling ads a day. The problem isn't abstract.",
      sections: [
        {
          heading: "Why this campaign",
          body: [
            "I chose this campaign because I live inside the problem. As a young Australian male I sit in the primary target demographic for gambling advertisers and receive over ten betting ads a day across my devices. That familiarity shaped how I read the campaign and where I saw its gaps.",
          ],
        },
        {
          heading: "The campaign",
          body: [
            "The Alliance for Gambling Reform is an Australian health promotion charity pushing for a full legislative ban on gambling advertising. Their End Gambling Ads campaign built an unusually broad coalition — former prime ministers from both major parties, crossbench senators, the AMA, union bodies and faith organisations.",
            "The diagnostic framing is sharp: opening with \"Australia has a gambling addiction\" makes the issue systemic rather than personal, which is harder for government to sidestep.",
          ],
        },
        {
          heading: "The structural weakness",
          body: [
            "The weakness is the ask. Campaigning for all 31 Murphy Report recommendations gave the government room to pass partial legislation in April 2026 and call it progress. A campaign with 31 demands gives decision-makers 31 ways to do just enough.",
          ],
        },
        {
          heading: "Recommendations",
          body: [
            "Two recommendations followed from the analysis. First, isolate the advertising ban as a standalone demand. One clear ask is harder to partially satisfy.",
            "Second, register as a minor political party before the next federal election. The goal isn't to win seats. In Australia's preferential voting system, credible minor party support in marginal electorates forces candidates to negotiate preference deals. AGR stops being a petitioner and starts having leverage.",
            "This idea came from a guest lecture by Judy Ryan, who used exactly this logic to secure the Richmond safe injecting room — I recognised the same mechanics applied here.",
          ],
        },
      ],
    },
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

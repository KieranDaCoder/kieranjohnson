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

// Consumer-research case study (e.g. a buyer-behaviour project): lead prose,
// a four-theme findings grid, a campaign strategy with a phone-frame mockup,
// an award certificate and a pull-quote. Renders the research layout.
export type ResearchCaseStudy = {
  kind: "research";
  discipline: string; // e.g. "Consumer Research — Victoria Police"
  result: string; // course + grade line, shown beneath the outcome
  // Lead prose sections before the findings (e.g. The Brief, My Role).
  intro: { heading: string; body: string[] }[];
  // "What We Found" — the four-theme findings grid.
  themesHeading: string;
  themes: { icon: ThemeIcon; title: string; description: string }[];
  // "From Insight to Campaign Strategy".
  strategyHeading: string;
  strategyIntro: string[]; // prose before the recommendations
  recommendations: { title: string; body: string }[];
  mockup: { username: string; caption: string; likes: string; comments: string };
  strategyOutro: string[]; // prose after the mockup
  // "Outcome" — prose, then the certificate and the pull-quote.
  outcomeHeading: string;
  outcome: string[];
  certificate: { src: string; alt: string };
  pullquote: { quote: string; attribution: string };
  // "What I Took From It".
  takeawayHeading: string;
  takeaway: string[];
};

// Icon keys for the research findings grid — mapped to inline SVGs on the page.
export type ThemeIcon = "coolness" | "credibility" | "identity" | "gatekeeping";

// When a project has a caseStudy, its page renders the matching rich layout
// instead of the simple overview/role/outcome layout.
export type CaseStudy = CreativeCaseStudy | AnalysisCaseStudy | ResearchCaseStudy;

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
    title: "Tattoos Don't Age Well Campaign",
    category: "Advertising",
    description:
      "A print campaign for the world's largest tattoo removal company. The idea: keep the tattoo, age the person wearing it.",
    year: "2026",
    image: "/work/removery/execution-1.png",
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
    slug: "shifting-the-norm",
    title: "Shifting the Norm",
    category: "Campaign Analysis",
    description:
      "A Buyer Behaviour study for Victoria Police into why young e-scooter riders skip helmets — and a consumer-research-led campaign strategy to change it.",
    year: "2026",
    image: "/work/shifting-the-norm/thumbnail_1.png",
    overview:
      "A consumer research project for Victoria Police, investigating why young e-scooter riders in Moonee Valley skip helmets despite the law — and what would actually change the behaviour.",
    role: "Interviews, thematic coding and analysis, strategic recommendations.",
    outcome:
      "RMIT University, MKTG1050 Buyer Behaviour. High Distinction, and a Certificate of Appreciation from Victoria Police.",
    caseStudy: {
      kind: "research",
      discipline: "Consumer Research — Victoria Police",
      result:
        "MKTG1050 Buyer Behaviour, RMIT University, Bachelor of Business. High Distinction, and a Certificate of Appreciation from Victoria Police.",
      intro: [
        {
          heading: "The brief",
          body: [
            "Victoria Police brought our class a real problem: young e-scooter riders in Moonee Valley were skipping helmets despite the legal requirement, and fines and awareness campaigns weren't changing that. They asked us to investigate the cause using consumer behaviour theory instead of a road-safety lens.",
          ],
        },
        {
          heading: "My role",
          body: [
            "I worked in a four-person team. I conducted two of the eight semi-structured interviews behind the dataset, then helped code and analyse the data using Braun and Clarke's six-phase thematic framework. We treated helmet non-compliance as a behavioural and identity problem, closer to brand perception than road safety.",
          ],
        },
      ],
      themesHeading: "What we found",
      themes: [
        {
          icon: "coolness",
          title: "The “Coolness Tax”",
          description:
            "Wearing a helmet when nobody else does carries a social cost, and riders weigh that cost above the risk of injury.",
        },
        {
          icon: "credibility",
          title: "A Credibility Gap",
          description:
            "Riders dismiss safety messaging from police and government sources before they process the content, because the source carries no weight with them.",
        },
        {
          icon: "identity",
          title: "Identity Fusion",
          description:
            "For many riders, their friend group's behaviour and their own identity are the same thing.",
        },
        {
          icon: "gatekeeping",
          title: "Parental Gatekeeping That Fades at the Wrong Time",
          description:
            "Parental oversight weakens just when riders need it most.",
        },
      ],
      strategyHeading: "From insight to campaign strategy",
      strategyIntro: [
        "The interviews pointed to credibility and identity as the barrier. Two recommendations followed:",
      ],
      recommendations: [
        {
          title: "Influencer-led campaigns",
          body: "on TikTok and Instagram, using peer-credible voices instead of institutional ones to close the trust gap.",
        },
        {
          title: "Mandatory point-of-sale safety briefings",
          body: "for retailers, aimed at the one moment parents are engaged enough to set expectations before peer norms take over.",
        },
      ],
      mockup: {
        username: "@ridesmart",
        caption:
          "POV: you wore the helmet and your mates clowned you for 5 seconds. Still walked away with zero road rash. Worth it. 🛴⛑️",
        likes: "12.4K",
        comments: "340",
      },
      strategyOutro: [
        "This is the part of the project that reads like PR strategy: find the actual barrier to behaviour change, then build the plan around the reference points the audience already trusts.",
      ],
      outcomeHeading: "Outcome",
      outcome: [
        "We earned a High Distinction for the project and a Certificate of Appreciation from Victoria Police for our contribution to their industry brief.",
      ],
      certificate: {
        src: "/work/shifting-the-norm/certificate.png",
        alt: "Certificate of Appreciation from Victoria Police, awarded to Kieran Johnson for contribution to the Buyer Behaviour industry report, Semester One 2026.",
      },
      pullquote: {
        quote:
          "A strong report with a clear research focus… [the discussion] provided valuable insights into why young people choose not to wear helmets.",
        attribution: "Dr Meg Mohammadian, Course Coordinator, MKTG1050",
      },
      takeawayHeading: "What I took from it",
      takeaway: [
        "This project sharpened my ability to turn qualitative insight into something a stakeholder can act on: why the current approach isn't landing, and which channel and messenger would work instead. That skill sits at the intersection of market research and PR strategy, and it's the part of this project I'd point to first.",
      ],
    },
  },
  {
    slug: "hidden-bites-secret-sips",
    title: "Hidden Bites & Secret Sips",
    category: "PR Strategy",
    description:
      "A creative media relations pitch to refresh the Melbourne Food & Wine Festival — built around the city's overlooked laneway restaurants, then defended live in a media conference format.",
    year: "2026",
    image: "/work/hidden-bites/thumbnail.png",
    overview:
      "A media relations project for Melbourne Food & Wine Festival: a creative concept redirecting attention toward the city's overlooked laneway and migrant-owned restaurants, pitched and defended live in a media conference format.",
    role: "Research, strategy, partnership development, live media conference pitch.",
    outcome:
      "RMIT University, COMM2921 Contemporary Media Relations. High Distinction.",
    caseStudy: {
      kind: "analysis",
      discipline: "Contemporary Media Relations — Melbourne Food & Wine Festival",
      result:
        "COMM2921 Contemporary Media Relations, RMIT University. High Distinction.",
      pullquote:
        "The hardest part wasn't building the concept — it was defending it live.",
      sections: [
        {
          heading: "The brief",
          body: [
            "Melbourne Food & Wine Festival has run since 1993 and is one of the largest events of its kind in the southern hemisphere, but a campaign built on the same formula every year risks losing media interest. Our brief was to design a creative concept that could refresh an established, well-known festival without abandoning what already works, then defend that concept live, in a media conference format, with our tutor and classmates playing the part of the company and the press.",
          ],
        },
        {
          heading: "My role",
          body: [
            "I worked as part of a five-person team. We split the work across research, strategy, partnership development, and media targeting, then prepared and delivered the pitch together, fielding questions as if we were briefing Food and Drink Victoria and the journalists covering the event.",
          ],
        },
        {
          heading: "The concept",
          body: [
            "We built the campaign around one idea: the festival already runs around 200 events across the city, but Melbourne has over 3,500 restaurants. Most of them never get a look from the festival spotlight. Our concept, \"Hidden Bites and Secret Sips: Discover Melbourne's Hidden Gems,\" redirected some of that attention toward the laneway and side-street restaurants that make up the city's actual food culture, particularly family-run and migrant-owned venues.",
            "Three messages carried the campaign: Support Your Local — pushing people toward the restaurants outside their own door, not just the festival's official line-up. Experience Melbourne's Diverse Cultures — Melbourne is home to people from over 140 cultures, and the festival was a chance to make that visible. Explore Melbourne's Restaurant Scene — using the festival's existing reach to send people further into the city than the official program does on its own.",
            "The reasoning behind it was deliberately tied to two real pressures: small, independent restaurants are the ones most exposed when spending tightens, and a food festival is one of the few cultural moments that can bring people together at a time when that kind of unity is harder to find.",
          ],
        },
        {
          heading: "Partnerships",
          body: [
            "Rather than just adding more events, we built the concept around partnerships that could extend the festival's reach without extending its budget.",
            "Google Maps, using \"Local Guides\" and a custom \"Hidden Gems\" trail to turn under-the-radar venues into something people could actually navigate to. EatClub, offering festival-branded discount dining deals to make the concept genuinely accessible, not just aspirational. Local Pegs, aimed specifically at 18 to 24 year olds, to get younger audiences engaging with venues before the main event even started. And a Google \"Review and Win\" campaign with a celebrity chef tie-in, with a daily prize draw across the ten days of the festival to keep people posting and reviewing throughout, not just on opening night.",
          ],
        },
        {
          heading: "Media strategy",
          body: [
            "We targeted three outlets, each chosen for a different reason rather than just reach: Broadsheet for its audience of inner-city professionals who already trust it for neighbourhood and hidden-venue recommendations, Time Out Melbourne for its younger, budget-conscious readership and \"what's on this week\" format, and The Age's Good Food section for the credibility it gives a campaign aimed at an older, more affluent audience. Each pitch was built around what that specific outlet's readers already cared about, not a one-size-fits-all media release.",
          ],
        },
        {
          heading: "The pitch",
          body: [
            "The hardest part wasn't building the concept, it was defending it live. Presenting in a media conference format meant treating the room like an actual press briefing: justifying the strategy on the spot, answering questions we hadn't scripted answers for, and holding the narrative together under the kind of scrutiny a real client or journalist would actually bring.",
          ],
        },
        {
          heading: "What I took from it",
          body: [
            "This project sat closer to the agency side of marketing than the research side, building a concept, justifying it with partnerships and data, and then standing in front of people whose job in the room was to push back on it. That combination, building a strategy and then defending it under pressure rather than just presenting it, is the part of this project I'd point to when talking about communications or PR work specifically.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

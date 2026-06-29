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
      "A print campaign for Removery. The idea: keep the tattoo, age the person wearing it.",
    year: "2026",
    image: "/work/removery/execution-1.png",
    overview:
      "The brief was completely open — just communicate what Removery does and why someone might need it. I went with humour over guilt: keep the tattoo, age the person wearing it.",
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
        "Removery's the world's largest tattoo removal company. The brief was completely open — no prescribed angle, no locked-in audience, no mandated tone. Just: communicate what the brand does and why someone might need it.",
        "The obvious routes — regret, career change, relationship breakdown — all lead to the same emotional territory, and that territory's already crowded. I wanted to go somewhere else. What if the tattoo stayed the same, but the person aged?",
        "I started with tattoo clichés. Live Fast Die Young. Young, Wild and Free. Daddy's Little Girl. Phrases that make perfect sense at 21 and become unintentionally hilarious at 80. The first executions were copy-only web banners — \"Live Fast, Die Young. Awkward when you're 80 and still kicking.\" \"Less believable when you need help wiping your butt.\"",
        "When the brief extended to a visual print campaign, the images took over from the words. Three posters, each showing an elderly person in an ordinary situation with an ironic tattoo on display.",
        "I went with humour over guilt deliberately. Funny ads get processed more deeply and recalled more readily than fear-based ones, and Removery's selling something people feel embarrassed about — a laugh lowers the barrier before the message lands. TATTOOS DON'T AGE WELL runs across all three. DON'T is red. Everything else is black on cream.",
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
      "I picked apart the Alliance for Gambling Reform's campaign to find the structural weakness — a 31-point ask that let the government do just enough — and recommended two moves that would force real change.",
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
      "A consumer research project for Victoria Police — why young riders skip helmets, and what would actually change that.",
    year: "2026",
    image: "/work/shifting-the-norm/thumbnail_1.png",
    overview:
      "Victoria Police asked us to figure out why young e-scooter riders in Moonee Valley skip helmets despite the law — and what would actually change the behaviour. We treated it as an identity problem, not a road-safety one.",
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
            "Victoria Police brought our class a real problem: young e-scooter riders in Moonee Valley were skipping helmets despite the legal requirement, and fines weren't changing that. They wanted us to figure out why — using consumer behaviour theory instead of a road-safety lens.",
          ],
        },
        {
          heading: "My role",
          body: [
            "I worked in a four-person team. I ran two of the eight interviews, then helped code and analyse the data using Braun and Clarke's thematic framework. The decision that shaped everything: we treated helmet non-compliance as a behavioural and identity problem — closer to brand perception than road safety.",
          ],
        },
      ],
      themesHeading: "What we found",
      themes: [
        {
          icon: "coolness",
          title: 'The “Coolness Tax”',
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
        "This is the bit that feels like PR work to me: find the actual barrier, then build the plan around the reference points the audience already trusts — not the ones we wish they did.",
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
        "This project sharpened something I keep coming back to: turning qualitative insight into something a stakeholder can actually act on. Why the current approach isn't landing, which channel would work instead, and who the messenger needs to be. That's the part of this project I'd point to first.",
      ],
    },
  },
  {
    slug: "hidden-bites-secret-sips",
    title: "Hidden Bites & Secret Sips",
    category: "PR Strategy",
    description:
      "A media relations pitch for Melbourne Food & Wine Festival — built around the city's overlooked laneway restaurants and defended live in a press briefing.",
    year: "2026",
    image: "/work/hidden-bites/thumbnail.png",
    overview:
      "The festival runs 200 events but Melbourne has 3,500+ restaurants — most never get a look. We built a concept around the laneway and migrant-owned venues the festival misses, then defended it live in front of the room.",
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
            "Melbourne Food & Wine Festival has run since 1993 — one of the largest in the southern hemisphere — but a campaign built on the same formula every year risks losing media interest. Our brief: design a concept that refreshes the festival without abandoning what works, then defend it live in a media conference, with our tutor and classmates playing the company and the press.",
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
            "The starting point was a gap we noticed: the festival runs around 200 events, but Melbourne has over 3,500 restaurants. Most never get a look. Our concept — \"Hidden Bites and Secret Sips\" — redirected some of that spotlight toward the laneway and side-street restaurants that make up the city's actual food culture, particularly family-run and migrant-owned venues.",
            "Three messages carried it: Support Your Local, Experience Melbourne's Diverse Cultures, and Explore Melbourne's Restaurant Scene. Each one pushed people further into the city than the official program does on its own.",
            "We tied the reasoning to two real pressures: small, independent restaurants are the most exposed when spending tightens, and a food festival is one of the few cultural moments that can genuinely bring people together.",
          ],
        },
        {
          heading: "Partnerships",
          body: [
            "Rather than adding more events, we built the concept around partnerships that extend the festival's reach without extending its budget.",
            "Google Maps with a custom \"Hidden Gems\" trail so people could actually navigate to under-the-radar venues. EatClub for festival-branded discount deals — making it accessible, not just aspirational. Local Pegs to get 18-to-24s engaging with venues before the main event. And a Google \"Review and Win\" campaign with a celebrity chef tie-in, running daily across the ten days to keep people posting throughout, not just on opening night.",
          ],
        },
        {
          heading: "Media strategy",
          body: [
            "We picked three outlets for different reasons, not just reach. Broadsheet for inner-city professionals who already trust it for hidden-venue recs. Time Out for its younger, budget-conscious readership. The Age's Good Food section for the credibility it lends with an older, more affluent audience. Each pitch was shaped around what that outlet's readers already care about — not a one-size-fits-all release.",
          ],
        },
        {
          heading: "The pitch",
          body: [
            "The hardest part wasn't building the concept — it was defending it live. A media conference format means treating the room like a real press briefing: justifying the strategy on the spot, answering questions you haven't scripted for, and holding the narrative together under actual scrutiny.",
          ],
        },
        {
          heading: "What I took from it",
          body: [
            "This one sat closer to agency work than research — building a concept, justifying it with partnerships and data, then standing in front of people whose job was to push back. Building a strategy is one thing; defending it under pressure is something else. That's the part of this project I'd point to first.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

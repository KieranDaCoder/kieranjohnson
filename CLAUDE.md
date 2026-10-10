@AGENTS.md

# Kieran Johnson portfolio: working notes for Claude

This file is the handover between sessions and devices. **Read it first. Update it before you finish.**
Claude's own memory is not shared between computers, so anything worth keeping goes here, in git.

## How to use this file

- **Start of a session:** read "Current state" and "Open items", run `git status -sb` and `git log --oneline -8`, then say in one or two lines where things were left.
- **End of a session or after any meaningful change:** update "Current state", tick or add "Open items", add one line to "Changelog", and commit this file together with the change.
- Keep it short and factual. If something is wrong or out of date, fix it rather than adding to it.

## What this is

- Digital portfolio for Kieran Johnson (RMIT, Advertising Professional Practice). Target role: **Junior Strategist**.
- **Deadlines:** merge cutoff Mon 12 Oct 2026 night. Pitch Wed 14 Oct. Due Fri 16 Oct, 6pm. (Fallback if it is not ready by Monday night: Squarespace.)
- **Live:** https://www.kieranjohnson.me (the apex `kieranjohnson.me` redirects to `www`). Older address `kieranjohnson.vercel.app` still works.
- Repo: `KieranDaCoder/kieranjohnson`. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript. Hosted on Vercel; `main` is production.

## Current state

_Update this block each session._

- Last updated: 2026-10-11.
- **Live design** (on `main`): black and white, Inter Tight only. Home is a "stacked folder" scroll: Hero, About me, My work, Contact. Each page holds in place while the next slides up over it and the one behind recedes. Contact page has a LinkedIn QR code (for presenting).
- **Placeholders still live:** About text, home About lines, Contact intro, every project page, project `alt`/`summary`. They show as `[PLACEHOLDER: Kieran to write]` until Kieran writes the copy. `npm run check:content` fails until they are gone.
- **Branches:** `main` = production. `redesign-stack` and `contact-qr` are already merged into it. `redesign-oct` = older scroll-snap version (tag `v-bw-snap`). `rebrand-navy-hero` / `redesign/lounge` = abandoned experiments. Tag `v-navy-old` = the original navy site, for rollback.
- **Previews:** every branch gets `https://kieranjohnson-git-<branch>-kieranssuperproject.vercel.app` (behind Vercel login).

## Open items

- [ ] Kieran writes all copy into `content/` (see Content below). Claude does not write it.
- [ ] Real project tile images at **3:4** (`tile:` in each project file) and a landscape hero (`hero:`). Summit Signal, Hidden Bites and Coolness Tax still use coloured SVG placeholders in `public/placeholders/`.
- [ ] Real portrait: replace `public/images/portrait-small.jpg` (square-ish crop) and `portrait-large.jpg`. Both are currently the same old photo.
- [ ] Final project list and order (4 to 6) via `order:` in each project file.
- [ ] Test on a real iPhone, an Android phone, desktop Chrome and Safari (touch drag, trackpad feel of the page lock, QR scan).
- [ ] Lighthouse pass (targets: performance 90+, accessibility 95+, LCP under about 2s on mobile).
- [ ] Per-project images between sections (`images:` frontmatter) once the images exist.
- [ ] Confirm which address is the primary: `www.kieranjohnson.me` is set as canonical in `src/app/layout.tsx` (`metadataBase`) because the apex redirects to it.
- [ ] Check the unit's AI-use policy for portfolio copy.

## Rules (non-negotiable)

1. **Copy rule.** This is graded work. Claude must not write, rewrite, improve or invent any visible copy, numbers, claims or testimonials. Visible text comes from Kieran's files in `content/`. Until he supplies it, use `[PLACEHOLDER: Kieran to write]`. The only text Claude may author is UI labels: Home, About, Work, Contact, About me, More about me, My work, See all work, Previous project, Next project, Back to all work, Junior Strategist, skip link and screen-reader-only labels, page titles and meta descriptions limited to Kieran's name and the section name. If unsure, ask.
2. **No em dashes or en dashes** in any visible text.
3. **Black and white only.** Project images are the only colour on the site.
4. **One font: Inter Tight** (variable, upright and italic), loaded in `src/app/layout.tsx`. Mix weights and italics for contrast; do not add a second family.
5. **Body text** is pure black on white or pure white on black. No grey body text, no text over images. `--grey` is for small labels only (currently unused).
6. **No decoration for its own sake:** no gradients as backgrounds, particles, glows, 3D, custom cursors, eyebrow numbers like "01", "Scroll" cues, or stock-looking filler.
7. **Never push or merge to `main` without Kieran saying so for that change.** Work on a branch, push it, give him the preview link, then ask. He will say "push to main".
8. Do not delete or overwrite tags `v-navy-old` and `v-bw-snap`.

## How Kieran likes to work

- Plain, direct answers. Lead with what changed and what to look at. Short lists over long prose. Be honest about what was not tested.
- He gives visual feedback with screenshots and annotated notes. Fix exactly what is circled or described; measure rather than guess (spacing, centring, sizes).
- He wants things to feel **premium and sleek**: big type, space, restraint, smooth motion that is not jumpy or flickery.
- He prefers seeing options as preview URLs. Create a branch per experiment and keep the previous version reachable (tag or branch).
- **Delegation:** when running as Opus, plan, write precise specs and verify; hand implementation and research to **Sonnet subagents** (`model: "sonnet"`) to save output tokens. Check their work yourself with screenshots and measurements before reporting.
- When a taste or design skill conflicts with Kieran's brief, the brief wins. Skills live in `.claude/skills/` (minimalist-ui, redesign-existing-projects). `output-skill` is deliberately not installed because it removes placeholders.

## Design system

- Tokens in `src/app/globals.css`: `--black #0a0a0a`, `--white #fff`, `--grey #8a8a8a`, `--tile-ratio 3/4`, `--image-ratio 3/2`, `--mat`.
- **Tone system.** `<Section tone="black|white">` sets `--fg`, `--bg`, `--line`; everything inside reads from them (`.btn`, `.btn-round`, hairlines, focus rings). Never hard-code colours per section. Home order: Hero black, About white, Work black, Contact white.
- **Type classes** (`@layer components`): `.t-hero` (name), `.t-hero-alt` (JOHNSON, weight 400 italic), `.t-sub` ("Junior Strategist"), `.t-h2` (huge uppercase 800 section titles, uses `text-box: trim-both cap alphabetic` so padding centres the letters), `.t-statement`, `.t-title`, `.t-tile-title`, `.t-body`, `.t-label`, `.t-meta`, `.t-page-title`.
- **Buttons:** round pills. Hover inverts to outline, but only inside `@media (hover: hover)` so tapped buttons do not stick.
- **Motion:** respect `prefers-reduced-motion` everywhere. Hero has a blur-in entrance and a continuous shimmer (CSS only). Pages stack only on desktop (see below).
- Nav: fixed glass pill, one style on every background, a white bubble slides between items (`motion`'s `layoutId`).

## Architecture

```
content/            all copy. home.json, about.md, contact.json, projects/<slug>.md (frontmatter + "## Heading" sections)
public/images/      portrait-*.jpg, linkedin-qr.png, projects/<slug>/...
src/lib/content.ts  server-only loader (gray-matter). Never invents text.
src/lib/stackLayout.ts  layoutTop(el): document top ignoring sticky
src/app/page.tsx    home: <StackScroll> with four <Section stack> blocks, HeadingRow helper, QR block
src/app/about, work, work/[slug]   inner pages: black PageHeader + white body
src/components/     Section, StackScroll, HeroName, SiteNav, WorkCarousel, ProjectTile, ContactList, PageHeader
scripts/check-content.mjs   fails while "[PLACEHOLDER" exists in content/
```

Project frontmatter: `title, slug, category, year, order, type (strategy|creative), tile, hero, alt, summary, images[]`. Body sections: strategy = Challenge, Insight, Solution; creative = Insight, Big idea, Execution. The tile shows the **title only** (no category or year).

## Things that were learned the hard way (do not repeat)

- **Stacked home scroll uses `position: sticky`, not GSAP `pin`.** GSAP pinning re-parents elements into a `.pin-spacer` on every refresh, which restarts CSS animations and made the hero flicker. GSAP (`StackScroll.tsx`) now only scrubs the fall-away (scale, tilt, shade), the snap (settle to open or closed, 0.18 to 0.44s) and hides the page two layers back. Sticky `top = min(0, viewportHeight - sectionHeight)`. Only active at min-width 768px and min-height 600px with motion allowed; phones and reduced motion scroll normally.
- Because sticky layers move while stuck, the nav and hash links use `layoutTop()` (sum of earlier sibling heights), not `getBoundingClientRect`.
- Do not animate CSS `filter` on the hero or tiles. Animate transform and opacity only. Hide the page two back instantly, never with a fade (it flickered).
- **Work carousel** (`WorkCarousel.tsx`): infinite loop both ways via a wrapped motion value, drag with inertia, wheel, arrows that glide on a plain-number animation (a spring on a reset motion value lurched backwards). No autoplay (Kieran orders projects best first). Tiles are edge to edge, 3:4, image fills the frame (`object-cover`), no borders or mat, eager images so wrapped copies never pop in. Tile width is capped by viewport height (`--work-reserve` in `globals.css`) so heading, frames and titles fit one screen.
- **QR code** uses the original PNG at fixed sizes (`.qr-code` in `globals.css`: 250/300/350/400/500px). Fluid sizing blurs the dots and some sizes fail to scan; `next/image` is `unoptimized` for it. It decodes to `https://www.linkedin.com/in/kieran-johnson262`.
- Tailwind orders arbitrary `min-[...]` variants behind named breakpoints; use a small CSS class in `globals.css` when a size must change at a specific width.
- There is no `/contact` or `/writing` page and no footer; Contact is a home section and Contact in the nav points to `/#contact`.
- Section and heading spacing was tuned by measurement. Desktop headings have extra top padding to clear the fixed nav; do not "tidy" it without re-measuring.

## Commands and checks (Windows, Git Bash)

```bash
npm run dev                # dev server
npm run lint && npx tsc --noEmit && npm run build   # must all pass before pushing
npm run check:content      # expected to fail until real copy is in
(npx next start -p 3007 > /dev/null 2>&1 &)          # serve a production build in the background
powershell -c "Get-NetTCPConnection -LocalPort 3007 -State Listen -EA 0 | % { Stop-Process -Id \$_.OwningProcess -Force }"
```

- Verify visually with `puppeteer-core` and Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe` (install it in a scratch folder, not the repo). Check at 360, 390, 1024, 1366, 1440 and 1920 wide, no horizontal overflow, and read the screenshots.
- In Git Bash a lone `/` argument gets rewritten to a Windows path; avoid passing `/` as a CLI argument.
- Git on a new device needs an identity: `git config user.name "Kieran Johnson"` and `git config user.email "kieranspambox@gmail.com"` (set per repo; not carried by the clone).
- Commit messages end with the Co-Authored-By line given in the session instructions. Git warns about LF to CRLF; that is harmless.
- Deploy check: after pushing a branch, `gh api repos/KieranDaCoder/kieranjohnson/deployments?sha=<sha>` then its statuses shows success or failure.

## Changelog

- 2026-10-11: custom domain `kieranjohnson.me` (apex redirects to `www`). `metadataBase` set to `https://www.kieranjohnson.me` so share previews no longer point at the old vercel.app. Added this file.
- 2026-10-11: LinkedIn handle changed to `www.linkedin.com/in/kieran-johnson262`; QR added to Contact; pushed to `main`.
- 2026-10-10: stacked-folder scroll with huge titles; footer removed; hero flicker fixed by replacing GSAP pins with sticky; snap about 20% quicker; work tiles larger. Pushed to `main`.
- 2026-10-09: rebuilt to brief v2 (black and white sections, text hero, `content/` loader, carousel, inner pages); Inter Tight replaced Newsreader.

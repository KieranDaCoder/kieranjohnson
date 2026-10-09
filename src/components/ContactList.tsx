import type { ContactLink } from "@/lib/content";

// Monochrome icons in currentColor so they follow the section tone.
const icons: Record<string, React.ReactNode> = {
  email: <path d="M3 6h18v12H3zM3 6l9 7 9-7" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M8 10v7M8 7v.01M12 17v-7M12 13.5c0-2 1.2-3.5 3-3.5s2.5 1.2 2.5 3V17" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
};
const fallback = <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />;

function Icon({ platform }: { platform: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {icons[platform.toLowerCase()] ?? fallback}
    </svg>
  );
}

// One full-width row per platform; the whole row is the link.
export function ContactList({ links }: { links: ContactLink[] }) {
  return (
    <ul className="border-t border-line">
      {links.map(({ platform, handle, url }) => {
        const external = !url.startsWith("mailto:");
        return (
          <li key={platform} className="border-b border-line">
            <a
              href={url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 py-6 md:gap-8 md:py-8"
            >
              <Icon platform={platform} />
              <span className="flex min-w-0 flex-1 flex-col md:flex-row md:items-baseline">
                <span className="t-title shrink-0 md:w-72">{platform}</span>
                <span className="t-body min-w-0 break-words font-light italic md:truncate">{handle}</span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

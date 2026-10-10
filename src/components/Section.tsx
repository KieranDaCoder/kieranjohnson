type Props = {
  tone: "black" | "white";
  id?: string;
  as?: "section" | "header" | "footer" | "div";
  className?: string;
  /** Home stack only: classes for the outer (id-bearing) element. */
  outerClassName?: string;
  /** Home stack: outer element is pinned, inner receives the fall-away transforms. */
  stack?: boolean;
  children: React.ReactNode;
};

// Full-width band. Everything inside reads its colours from the tone
// (text-fg, bg-fg, border-line, .btn), so nothing is hard-coded per section.
export function Section({
  tone,
  id,
  as: Tag = "section",
  className = "",
  outerClassName = "",
  stack = false,
  children,
}: Props) {
  if (!stack) {
    return (
      <Tag id={id} data-tone={tone} className={`tone-${tone} ${className}`}>
        {children}
      </Tag>
    );
  }
  // The outer element has no background so the receding inner shows the page
  // behind it at its edges.
  return (
    <Tag id={id} data-tone={tone} data-stack="" className={outerClassName}>
      <div data-stack-inner="" className={`relative tone-${tone} ${className}`}>
        {children}
        <div
          data-stack-shade=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
        />
      </div>
    </Tag>
  );
}

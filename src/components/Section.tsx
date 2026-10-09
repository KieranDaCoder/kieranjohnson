type Props = {
  tone: "black" | "white";
  id?: string;
  as?: "section" | "header" | "footer" | "div";
  className?: string;
  children: React.ReactNode;
};

// Full-width band. Everything inside reads its colours from the tone
// (text-fg, bg-fg, border-line, .btn), so nothing is hard-coded per section.
export function Section({ tone, id, as: Tag = "section", className = "", children }: Props) {
  return (
    <Tag id={id} data-tone={tone} className={`tone-${tone} ${className}`}>
      {children}
    </Tag>
  );
}

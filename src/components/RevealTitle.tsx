type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
};

// Splits a title into word spans so CSS can slide them in one after another.
// Server-safe: no client JS. The text stays real, selectable text.
export function RevealTitle({ children, as = "h2", className = "" }: Props) {
  const Tag = as;
  const words = children.split(/\s+/).filter(Boolean);
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="reveal-word" style={{ "--w": i } as React.CSSProperties}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

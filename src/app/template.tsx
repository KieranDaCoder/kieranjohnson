// Per-route fade-in. CSS only, so route changes cost no client JS.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fade-in">{children}</div>;
}

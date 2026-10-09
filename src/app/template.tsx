// 200ms fade-in on each page load. CSS only, no client JS.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fade-in">{children}</div>;
}

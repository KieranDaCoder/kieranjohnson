import Link from "next/link";

type Props = {
  title: string;
  cta?: { label: string; href: string };
};

export function RowHeader({ title, cta }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black pb-5">
      <h2 className="t-section">{title}</h2>
      {cta && (
        <Link href={cta.href} className="btn-pill shrink-0 whitespace-nowrap text-sm sm:text-base">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

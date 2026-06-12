import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 px-6 py-12 md:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-3xl text-charcoal">Kieran Johnson</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Communications · PR &amp; Advertising · Melbourne
          </p>
        </div>
        <div className="flex gap-8 text-sm uppercase tracking-wide">
          <a href="mailto:hello@example.com" className="link-sweep text-charcoal/70 hover:text-accent">
            Email
          </a>
          <a
            href="https://linkedin.com/in/your-handle"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep text-charcoal/70 hover:text-accent"
          >
            LinkedIn
          </a>
          <Link href="/contact" className="link-sweep text-charcoal/70 hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
      <p className="mt-10 text-xs text-charcoal/40">
        © {new Date().getFullYear()} Kieran Johnson. Designed &amp; built with intent.
      </p>
    </footer>
  );
}

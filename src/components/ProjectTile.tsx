import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content";

type Props = {
  project: Pick<Project, "slug" | "title" | "category" | "year" | "tile" | "alt">;
  sizes: string;
  // Full-width tile in the /work grid keeps the row height of a normal tile.
  wide?: boolean;
  heading?: "h2" | "h3";
  // Carousel variant: padded text block and smaller title.
  compact?: boolean;
  tabIndex?: number;
};

// Poster sits in a mat like a print: never cropped, text below in the tone colour.
export function ProjectTile({
  project,
  sizes,
  wide = false,
  heading: Heading = "h3",
  compact = false,
  tabIndex,
}: Props) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-offset-[-6px]"
      tabIndex={tabIndex}
      draggable={false}
    >
      <div
        className={`tile-frame relative overflow-hidden bg-[var(--mat)] ${wide ? "tile-wide" : ""}`}
      >
        <div className="absolute inset-[9%]">
          <Image
            src={project.tile}
            alt={project.alt}
            fill
            sizes={sizes}
            draggable={false}
            unoptimized={project.tile.endsWith(".svg")}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>
      <div className={compact ? "px-5 py-4" : "mt-5"}>
        <p className="t-label">{project.category}</p>
        <Heading
          className={`${compact ? "t-tile-title" : "t-title"} mt-2 underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-200 group-hover:decoration-current`}
        >
          {project.title}
        </Heading>
        <p className="t-meta mt-2">{project.year}</p>
      </div>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content";

type Props = {
  project: Pick<Project, "slug" | "title" | "category" | "year" | "tile" | "alt">;
  sizes: string;
  // Full-width tile in the /work grid keeps the row height of a normal tile.
  wide?: boolean;
  heading?: "h2" | "h3";
};

// Image at one fixed ratio, square corners, text below in the tone colour.
export function ProjectTile({ project, sizes, wide = false, heading: Heading = "h3" }: Props) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className={`tile-frame relative overflow-hidden bg-line ${wide ? "tile-wide" : ""}`}>
        <Image
          src={project.tile}
          alt={project.alt}
          fill
          sizes={sizes}
          unoptimized={project.tile.endsWith(".svg")}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <p className="t-label mt-5">{project.category}</p>
      <Heading className="t-title mt-2 underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-200 group-hover:decoration-current">
        {project.title}
      </Heading>
      <p className="t-meta mt-2">{project.year}</p>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = { project: Project };

export function ProjectTile({ project }: Props) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: "var(--tile-ratio)" }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 90vw, 30vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-16 text-white">
        <div className="t-caption text-white/75">{project.category}</div>
        <div className="text-xl font-semibold underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-300 group-hover:decoration-accent">
          {project.title}
        </div>
        <div className="t-caption">{project.year}</div>
      </div>
    </Link>
  );
}

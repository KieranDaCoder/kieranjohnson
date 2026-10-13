// Dev-only: stores review comments in .review/comments.json so Claude can read them.
import { promises as fs } from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), ".review", "comments.json");
const off = () => new Response("Not found", { status: 404 });

async function load(): Promise<unknown[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function save(list: unknown[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

export async function GET() {
  if (process.env.NODE_ENV !== "development") return off();
  return Response.json(await load());
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") return off();
  const body = await request.json();
  const list = (await load()) as { id: string }[];
  if (body.delete) {
    await save(list.filter((c) => c.id !== body.delete));
  } else {
    list.push({ ...body, status: "open" });
    await save(list);
  }
  return Response.json({ ok: true });
}

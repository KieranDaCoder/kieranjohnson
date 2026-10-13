"use client";

// Dev-only review tool. Toggle "Review", then select text or click anything
// and leave a note. Notes are saved to .review/comments.json for Claude to act on.
import { useEffect, useRef, useState } from "react";

type Note = {
  id: string;
  page: string;
  width: number;
  selector: string;
  text: string;
  comment: string;
  status?: string;
};
type Draft = Omit<Note, "id" | "comment" | "page" | "width"> & { x: number; y: number };

function selectorFor(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node !== document.body && parts.length < 5) {
    let part = node.tagName.toLowerCase();
    if (node.id) {
      parts.unshift(`${part}#${node.id}`);
      break;
    }
    const cls = [...node.classList].slice(0, 3).join(".");
    if (cls) part += `.${cls}`;
    parts.unshift(part);
    node = node.parentElement;
  }
  return parts.join(" > ");
}

export function ReviewOverlay() {
  const [on, setOn] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [comment, setComment] = useState("");
  const box = useRef<HTMLDivElement>(null);

  const refresh = () =>
    fetch("/api/review").then((r) => r.json()).then(setNotes).catch(() => {});

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (!on) return;
    const ui = (t: EventTarget | null) => !!(t as Element)?.closest?.("[data-review-ui]");
    const onUp = (e: MouseEvent) => {
      if (ui(e.target)) return;
      const sel = window.getSelection()?.toString().trim() ?? "";
      const el = e.target as Element;
      setDraft({ selector: selectorFor(el), text: sel || (el.textContent ?? "").trim().slice(0, 200), status: sel ? "selection" : "element", x: e.clientX, y: e.clientY });
      setComment("");
    };
    const block = (e: MouseEvent) => {
      if (ui(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("mouseup", onUp, true);
    document.addEventListener("click", block, true);
    document.documentElement.style.cursor = "crosshair";
    return () => {
      document.removeEventListener("mouseup", onUp, true);
      document.removeEventListener("click", block, true);
      document.documentElement.style.cursor = "";
    };
  }, [on]);

  const post = (body: object) =>
    fetch("/api/review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then(refresh);

  const submit = async () => {
    if (!draft || !comment.trim()) return;
    await post({
      id: crypto.randomUUID(),
      page: location.pathname + location.hash,
      width: window.innerWidth,
      selector: draft.selector,
      text: draft.text,
      comment: comment.trim(),
    });
    setDraft(null);
    setComment("");
  };

  const btn = "rounded-full border border-white/40 bg-black px-4 py-2 text-xs font-semibold text-white";
  const openNotes = notes.filter((n) => n.status !== "done");

  return (
    <div data-review-ui className="fixed bottom-4 left-4 z-[1000] font-sans text-xs text-white">
      <div className="flex gap-2">
        <button className={btn} style={on ? { background: "#d00" } : undefined} onClick={() => setOn(!on)}>
          {on ? "Review: ON" : "Review"}
        </button>
        <button className={btn} onClick={() => setOpen(!open)}>
          Notes ({openNotes.length})
        </button>
      </div>
      {open && (
        <div className="mt-2 max-h-[50vh] w-80 overflow-auto rounded-xl border border-white/30 bg-black p-3">
          {openNotes.length === 0 && <p>No open notes.</p>}
          {openNotes.map((n) => (
            <div key={n.id} className="mb-3 border-b border-white/20 pb-2">
              <p className="opacity-60">{n.page} · {n.width}px</p>
              {n.text && <p className="italic opacity-80">&ldquo;{n.text.slice(0, 80)}&rdquo;</p>}
              <p>{n.comment}</p>
              <button className="mt-1 underline" onClick={() => post({ delete: n.id })}>Delete</button>
            </div>
          ))}
        </div>
      )}
      {draft && (
        <div
          ref={box}
          className="fixed w-72 rounded-xl border border-white/40 bg-black p-3"
          style={{ left: Math.min(draft.x, window.innerWidth - 300), top: Math.min(draft.y + 12, window.innerHeight - 200) }}
        >
          {draft.text && <p className="mb-2 italic opacity-70">&ldquo;{draft.text.slice(0, 80)}&rdquo;</p>}
          <textarea
            autoFocus
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
              if (e.key === "Escape") setDraft(null);
            }}
            placeholder="What should change? (Ctrl+Enter to save)"
            className="h-20 w-full rounded bg-white/10 p-2 text-white"
          />
          <div className="mt-2 flex gap-2">
            <button className={btn} onClick={submit}>Save note</button>
            <button className={btn} onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

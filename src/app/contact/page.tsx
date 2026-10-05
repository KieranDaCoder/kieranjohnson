"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

const EMAIL = "kieranjohnson262@gmail.com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  // No backend: compose an email in the visitor's mail client instead.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n${name}${from ? ` (${from})` : ""}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border-2 border-ink bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:bg-white focus:outline-none";

  return (
    <>
      <PageHeader icon="/icons/contact.svg" title="Contact Me">
        Reach out over email or fill in the form and I&apos;ll get back to you as soon as I can.
      </PageHeader>

      <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <a href={`mailto:${EMAIL}`} className="link-sweep text-ink">
          {EMAIL}
        </a>
        <a
          href="https://www.linkedin.com/in/kieran-johnson-28b372359/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-sweep text-ink"
        >
          LinkedIn
        </a>
      </Reveal>

      <Reveal delay={0.25}>
        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className={field}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={field}
              placeholder="Your email address"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <textarea
            className={`${field} min-h-48 resize-y`}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full border-2 border-ink bg-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
          >
            Submit
          </button>
        </form>
      </Reveal>
    </>
  );
}

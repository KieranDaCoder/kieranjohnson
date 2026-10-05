import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

// Temporary placeholder sections. WP5 rebuilds them.
const sections = [
  { id: "key-works", label: "01 / Key works", heading: "Side A: Key works" },
  { id: "crate", label: "02 / The crate", heading: "Side B: The crate" },
  { id: "about", label: "03 / Located in Melbourne", heading: "About me" },
  { id: "contact", label: "04 / Say hello", heading: "Say hello" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <div id="content" className="bg-paper px-6 md:px-10">
        {sections.map(({ id, label, heading }) => (
          <section key={id} id={id} data-section={id} className="flex min-h-[60svh] flex-col justify-center py-20">
            <p className="mono-label text-ink-muted">{label}</p>
            <h2 className="display mt-4 text-6xl md:text-8xl">{heading}</h2>
          </section>
        ))}
        <div className="pb-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

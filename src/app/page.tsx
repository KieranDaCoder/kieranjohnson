import { Hero } from "@/components/Hero";
import { KeyWorks } from "@/components/KeyWorks";
import { Crate } from "@/components/Crate";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="content">
        <KeyWorks />
        <Crate />
        <AboutSection />
        <ContactSection />
        <div className="bg-paper px-6 pb-12 md:px-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroA from "@/components/sections/HeroA";
import HeroB from "@/components/sections/HeroB";
import ProblemMission from "@/components/sections/ProblemMission";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import Impact from "@/components/sections/Impact";
import WaysToHelp from "@/components/sections/WaysToHelp";
import TeamMembers from "@/components/sections/TeamMembers";
import FAQ from "@/components/sections/FAQ";
import ContactNewsletter from "@/components/sections/ContactNewsletter";
import { partners } from "@/data/cms";

function chooseVariant() {
  const key = "hero_variant";
  const stored = localStorage.getItem(key);
  if (stored === "A" || stored === "B") return stored;
  const pick = Math.random() < 0.5 ? "A" : "B";
  localStorage.setItem(key, pick);
  return pick;
}

export default function Index() {
  const variant = typeof window !== "undefined" ? chooseVariant() : "A";

  return (
    <div className="min-h-screen">
      <Header />

      {variant === "A" ? <HeroA /> : <HeroB />}


      <ProblemMission />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Impact />
      <WaysToHelp />
      <TeamMembers />
      <FAQ />
      <ContactNewsletter />

      <Footer />
    </div>
  );
}

import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchModal from "./components/SearchModal";
import SolutionsSection from "./components/SolutionsSection";
import TechServicesSection from "./components/TechServicesSection";
import WhoWeAreSection from "./components/WhoWeAreSection";
import ProcessStepsSection from "./components/ProcessStepsSection";
import ExcellentServicesSection from "./components/ExcellentServicesSection";
import WorkProcessSection from "./components/WorkProcessSection";
import TechnologiesSection from "./components/TechnologiesSection";
import PricingPlansSection from "./components/PricingPlansSection";
import ProjectsSection from "./components/ProjectsSection";
import IndustriesSection from "./components/IndustriesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsBannerSection from "./components/StatsBannerSection";
import FaqSection from "./components/FaqSection";
import FooterSection from "./components/FooterSection";
import FloatingWidgets from "./components/FloatingWidgets";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [pickedTopic, setPickedTopic] = useState("");

  const handleOpenQuote = () => {
    document.getElementById("callback-form")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("company")?.focus(), 300);
  };

  return (
    <div>
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenQuote={handleOpenQuote}
      />

      <HeroSection selectedService={pickedTopic} />
      <SolutionsSection />
      <TechServicesSection />
      <WhoWeAreSection />
      <ProcessStepsSection />
      <ExcellentServicesSection />
      <WorkProcessSection />
      <TechnologiesSection />
      <PricingPlansSection onSelectPlan={(planLabel) => setPickedTopic(planLabel)} />
      <ProjectsSection />
      <IndustriesSection />
      <TestimonialsSection />
      <StatsBannerSection />
      <FaqSection />
      <FooterSection />

      <FloatingWidgets />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTopic={(topic) => setPickedTopic(topic)}
      />
    </div>
  );
}
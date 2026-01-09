import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustValuesSection } from "@/components/sections/TrustValuesSection";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <HeroSection />
      <TrustValuesSection />
      <AboutUsSection />
      <ValuePropositionSection />
      <ServicesSection />
      <StatsSection />
      <TeamSection />
      <Footer />
    </main>
  );
}


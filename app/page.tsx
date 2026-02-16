import { HeroSection } from "@/components/sections/HeroSection";
import { TrustValuesSection } from "@/components/sections/TrustValuesSection";
import { QuoteDivider } from "@/components/sections/QuoteDivider";
import { SimpleDivider } from "@/components/sections/SimpleDivider";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { Footer } from "@/components/sections/Footer";
import { StickyCallButton } from "@/components/ui/StickyCallButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-light text-gray-800 transition-colors duration-300">
      <HeroSection />
      <TrustValuesSection />
      <QuoteDivider />
      <ServicesSection />
      <SimpleDivider />
      <AboutUsSection />
      <SimpleDivider />
      <WhyChooseUsSection />
      <SimpleDivider />
      <ResultsSection />
      <SimpleDivider />
      <TeamSection />
      <CtaSection />
      <ContactFormSection />
      <Footer />
      <StickyCallButton />
    </main>
  );
}


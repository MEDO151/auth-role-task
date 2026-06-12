import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import { Navbar } from "@/components/ui/navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServicesSection/>
    </div>
  );
}

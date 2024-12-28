import { Hero } from "@/components/aboutUs/Hero";
import { OurMission } from "@/components/aboutUs/OurMission";
import { OurTeam } from "@/components/aboutUs/OurTeam";
import { OurValues } from "@/components/aboutUs/OurValues";
import { OurHistory } from "@/components/aboutUs/OurHistory";
import { Testimonials } from "@/components/aboutUs/Testimonials";
import { ContactCTA } from "@/components/aboutUs/ContactCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#121212]">
      <Hero />
      <OurMission />
      <OurTeam />
      <OurValues />
      <OurHistory />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}

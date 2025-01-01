import { Hero } from "@/components/about/Hero";
import { OurMission } from "@/components/about/OurMission";
import { OurTeam } from "@/components/about/OurTeam";
import { OurValues } from "@/components/about/OurValues";
import { OurHistory } from "@/components/about/OurHistory";
import { Testimonials } from "@/components/about/Testimonials";

export default function AboutPage() {
  return (
    <div className="min-h-screen h-full w-full bg-slate-950">
      <Hero />
      <OurMission />
      <OurTeam folderName="who_we_are" />
      <OurValues />
      <OurHistory />
      <Testimonials />
    </div>
  );
}

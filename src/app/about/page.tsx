import { Hero } from "@/components/about/hero";
import { OurMission } from "@/components/about/our_mission";
import { OurTeam } from "@/components/about/our_team";
import { OurValues } from "@/components/about/our_values";
import { OurHistory } from "@/components/about/our_history";
import { Testimonials } from "@/components/about/testimonials";

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

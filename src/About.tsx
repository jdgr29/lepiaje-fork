import { BadgeCent, BrainCircuit, Store } from "lucide-react";
import { LandingFeatureList } from "./components/landing/feature/LandingFeatureList";
import { LandingBandSection } from "./components/landing/LandingBand";

import { LandingProductFeature } from "./components/landing/LandingProductFeature";
import { LandingProductFeaturesGrid } from "./components/landing/LandingProductFeaturesGrid";
import { LandingPrimaryTextCtaSection } from "./components/landing/cta/LandingPrimaryCta";

export default function About() {
  const missionItems = [
    {
      icon: <BrainCircuit />,
      title: "Hello World",
      description:
        "Hello World.",
    },

    {
      icon: <BadgeCent />,
      title: "Hello World",
      description:
        "Hello World.",
    },
    {
      icon: <Store />,
      title: "Hello World",
      description: "",
    },
  ];

  return (
    <>
      <div
        style={{
          // backgroundImage: `url(${??})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <LandingFeatureList 
        titleComponent={<h1 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading text-center" >Mission</h1>}
        featureItems={missionItems} 
        />
      </div>

      <LandingPrimaryTextCtaSection 
        title="Hello World" 
        descriptionComponent={<Building />}  
      />


      <LandingProductFeaturesGrid title="Hello World" withBackground={false}>
        <LandingProductFeature
          title="Hello"
          description="Hello"
          // imageSrc={??}
        />
        <LandingProductFeature
          title="Hello"
          description="Hello"
          // imageSrc={??}
        />
        <LandingProductFeature
          title="Hello"
          description="Hello"
          // imageSrc={??}
        />
      </LandingProductFeaturesGrid>
      
      <LandingBandSection
        title="Here"
        supportingComponent={
          <>
            <p>
              Hey.
            </p>
          </>
        }
      />
    </>
  );
}


function Building() {
  return (
    <p className="text-left mt-6">
    Hey this is text. <br />
    <br />
    Hey this is more text. <br />
    <br />
    Hey this is more text.
    <br />
    Hey this is more text.
  </p>
);
}

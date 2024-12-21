import { LandingPrimaryTextCtaSection } from "@/components/landing/cta/LandingPrimaryCta";
import { Component, Link } from "lucide-react";
import { LandingFeatureList } from "./components/landing/feature/LandingFeatureList";

import { Button } from "./components/shared/ui/button";

export default function Home() {
  const featureItems = [
    {
      icon: <Component />,
      title: "...",
      description:
        "...",
    },
    {
      icon: <Link />,
      title: "...",
      description:
        "... ",
    }
  ];

  const faqItems = [
    {
      question: "Question 1?",
      answer: (
        <p>
          Answer 1
        </p>
      ),
    },
    {
      question: "Q2?",
      answer: (
        <p>
          Yes
        </p>
      ),
    }
  ];

  return (
    <>
      <div
        style={{
          // backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <LandingPrimaryTextCtaSection
          titleComponent={<h1 className="text-4xl">Welcome <br></br> Home</h1>}
          description="subtitle"
        >
          <div className="flex flex-row gap-2">
            <Button asChild>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium"
              >
                Read about us
              </a>
            </Button>
          </div>
        </LandingPrimaryTextCtaSection>
      </div>
      <LandingFeatureList title="What is It?" featureItems={featureItems} />

      <LandingPrimaryTextCtaSection title="HELLO" />
    </>
  );
}
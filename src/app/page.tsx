import React from "react";
import Hero from "@/components/hero/hero";
import Gallery from "@/components/gallery/gallery";
import Carousel from "@/components/carousel/carousel";
import ContactForm from "@/components/contact_form/contact_form";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("landing_page.hero");

  return (
    <div className="bg-slate-950 w-full h-full">
      <React.Fragment>
        <Hero
          title={t("title")}
          subtitle={t("sub_title")}
          text={t("main_text")}
          overlayColor="rgba(0,0,0,0.5)"
        />
        <Gallery />
        <Carousel />
        <ContactForm />
      </React.Fragment>
    </div>
  );
}

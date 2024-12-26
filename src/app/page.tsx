import React from "react";
import Hero from "@/components/hero/hero";
import Gallery from "@/components/gallery/gallery";
import Carousel from "@/components/carousel/carousel";
import ContactForm from "@/components/contactForm/contact-form";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <div>
      <React.Fragment>
        <Hero
          title="Le Piaje"
          subtitle="Azienda Agricola"
          text="     Siamo una famiglia di imprenditori agricoli dadicati alla coltivazione della vite e dell'olivo 
          con particolare riguardo, in questi ultimi anni, al mondo dell'ospitalità e della valorizzazione delle bellezze 
          naturali e culurali della Tuscia.

          Viaggiatori, turisti, famiglie, buongustai, amanti della natura incontaminata: 
          Le Piaje saranno liete di aprirvi le porte sul mondo agricolo, 
          turistico e francigeno, dove i colori e i profumi Falisci vi porteranno ad immergervi nella quarta dimensione."
          overlayColor="rgba(0,0,0,0.5)"
        />
        <div className="h-[20em] w-full bg-[#f4f4]">
          <p>{t("title")}</p>
        </div>
        <Gallery />
        <Carousel />
        <ContactForm />
      </React.Fragment>
    </div>
  );
}

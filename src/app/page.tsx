import React from "react";
import Hero from "@/components/hero/hero";
import Gallery from "@/components/gallery/gallery";
import Carousel from "@/components/carousel/carousel";
import ContactForm from "@/components/contactForm/contact-form";

export default function Home() {
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
        {/* <AnimatedCarouselGallery /> */}
        <Gallery />
        <Carousel />
        <ContactForm />
      </React.Fragment>
    </div>
  );
}

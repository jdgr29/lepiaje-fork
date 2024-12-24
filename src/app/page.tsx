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
          title="LePiaje"
          subtitle="Discover something new"
          text="     Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            reiciendis mollitia dolorum veritatis iste repudiandae repellat
            nobis, est recusandae earum exercitationem perspiciatis atque quia
            laudantium. Ipsa vel officia facilis quod!"
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

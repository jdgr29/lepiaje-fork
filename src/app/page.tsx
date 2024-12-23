import React from "react";
import Hero from "@/components/hero/hero";

import Gallery from "@/components/gallery/gallery";
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
        <div className="h-[600px] bg-[#121212] w-full"></div>
        <div className="h-[300px] bg-[#1222] w-full"></div>
      </React.Fragment>
    </div>
  );
}

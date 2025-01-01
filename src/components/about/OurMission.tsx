import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import Image from "next/image";
import verna from "../../../public/assets/who_we_are/verna.jpg";

export function OurMission() {
  return (
    <AnimateOnScroll
      index={1}
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-md mx-auto lg:max-w-none md:max-2xl:h-[28em] h-[24em] relative rounded-lg shadow-lg overflow-hidden">
            <Image
              src={verna}
              alt="Our mission visualization"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-200 font-bold">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              At Le Piaje, we are dedicated to providing unparalleled luxury
              experiences in our exquisite villa retreats. Our mission is to
              create unforgettable moments of relaxation, indulgence, and
              connection with nature for our esteemed guests.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Curate exceptional villa properties in stunning locations</li>
              <li>Deliver personalized, high-touch service to every guest</li>
              <li>Promote sustainable and responsible luxury tourism</li>
              <li>Create lasting memories through unique experiences</li>
            </ul>
            <button className="mt-4 px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

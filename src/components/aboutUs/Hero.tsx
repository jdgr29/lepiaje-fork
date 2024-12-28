import Image from "next/image";
import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import villaPerlata6 from "../../../public/assets/villa_perlata/6.jpg"; //TODO Temporal
//TODO add real data
export function Hero() {
  return (
    <AnimateOnScroll
      index={0}
      className="relative w-full h-screen min-h-[400px] flex items-center justify-center"
    >
      <div className="absolute h-full inset-0 overflow-hidden">
        <Image
          src={villaPerlata6}
          alt="Le Piaje About Us Hero Background Image"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className=" px-8 relative z-10 text-center text-white">
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Some placer holder text here that will be changed later on
        </p>
      </div>
    </AnimateOnScroll>
  );
}

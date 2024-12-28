import { AnimateOnScroll } from "../animateViewOnScroll/animateViewOnScroll";
import Image from "next/image";
import verna from "../../../public/assets/who_we_are/verna.jpg";

//TODO add real data
export function OurMission() {
  return (
    <AnimateOnScroll index={1} className="py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative h-screen  md:w-1/2 mb-8 md:mb-0">
            <Image
              src={verna}
              alt="Our mission visualization"
              className="rounded-lg shadow-lg"
              fill
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl text-gray-200 font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
              temporibus hic. Dolorem aliquam cum quam sint magni fuga beatae
              expedita eos minus modi autem adipisci voluptatibus repellendus
              totam, itaque quibusdam?
            </p>
            <ul className="list-disc list-inside text-gray-200">
              <li>Lorem lorem lorem </li>
              <li>Lorem Lorem Lorem</li>
              <li>Lorem Lorem Lorem</li>
              <li>Lorem Lorem Lorem</li>
            </ul>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

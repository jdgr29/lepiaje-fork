import React from "react";
import Image from "next/image";
import heroBackgroundImage from "../../../public/assets/farm/melograni.jpeg";

interface HeroProps {
  title: string;
  subtitle?: string;
  overlayColor?: string;
  text?: string;
}

export default function Hero({
  title,
  subtitle,
  overlayColor,
  text,
}: HeroProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={heroBackgroundImage}
        alt="Hero background"
        fill
        style={{ objectFit: "fill" }}
        className="blur-sm"
      />
      <div
        className="absolute border-0 inset-0"
        style={{ backgroundColor: overlayColor }}
      ></div>
      <div className="md:max-2xl:px-40 px-5 md:max-2xl:pb-0 pb-20 gap-y-8 relative z-10 flex h-full flex-col items-center justify-center text-center text-zinc-200">
        <div>
          <h1 className="text-lepiajeBrown mb-4 text-4xl font-bold md:max-2xl:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lepiajeBrown font-thin text-2xl italic  md:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {text && <p className="text-lepiajeWhite text-xl md:text-xl">{text}</p>}
      </div>
    </div>
  );
}

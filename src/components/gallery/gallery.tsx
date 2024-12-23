"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { farmImages as images } from "../../../public/assets/farm";
import galleryBackground from "../../../public/assets/villa_perlata/notte_sotto.jpeg";

interface AnimatedGalleryCarouselProps {
  autoSlide?: boolean;
}

export default function Gallery({
  autoSlide = true,
}: AnimatedGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [autoSlide, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative bg-cover bg-center py-10 w-full h-auto bg-[#121212]"
      style={{
        backgroundImage: `url(${galleryBackground})`,
      }}
    >
      <Image
        src={galleryBackground}
        alt="Hero background"
        fill
        style={{ objectFit: "contain" }}
        className="blur-sm"
      />
      {/* overlay can be an image or simple a background color maybe a gradient */}

      <h1 className="text-lepiajeBrown text-4xl text-center pb-8 relative z-10">
        Some text here maybe?
      </h1>
      <div className="max-w-6xl mx-auto p-4">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        ></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className="cursor-pointer aspect-video relative overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <span className="text-white text-lg font-semibold">View</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Carousel below */}
        <React.Fragment>
          <h1 className="text-lepiajeBrown text-4xl text-center pb-8">
            Some text here maybe?
          </h1>
          <div className="relative  h-[30em]  mb-4 overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Selected image`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </React.Fragment>

        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer flex-shrink-0 ${
                index === currentIndex ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="relative h-[7em] w-[6em]">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="object-cover rounded"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

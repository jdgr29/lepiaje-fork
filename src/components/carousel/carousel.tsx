"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://picsum.photos/id/1018/1000/600",
  "https://picsum.photos/id/1015/1000/600",
  "https://picsum.photos/id/1019/1000/600",
  "https://picsum.photos/id/1016/1000/600",
  "https://picsum.photos/id/1020/1000/600",
];

export default function AnimatedCarouselGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative aspect-video mb-4">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex justify-center space-x-2">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer ${
              index === currentIndex ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={60}
              className="object-cover rounded"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

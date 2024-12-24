"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { farmImages as images } from "../../../public/assets/farm";
import galleryBackground from "../../../public/assets/villa_perlata/13.jpg";

export default function Gallery() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOverlayClick = () => {
    setExpandedIndex(null);
  };

  return (
    <div
      className="relative z-40 bg-cover bg-center py-10 w-full h-auto bg-[#121212]"
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

      <h1 className="text-lepiajeBrown font-thin text-4xl text-center pb-8 relative z-10">
        A peak into our world
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
              layoutId={`image-${index}`}
              onClick={() => handleImageClick(index)}
              initial={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer aspect-video relative overflow-hidden rounded-lg ${
                expandedIndex === index ? "z-50" : "z-10"
              }`}
              style={{
                gridColumn: expandedIndex === index ? "1 / -1" : "auto",
                gridRow: expandedIndex === index ? "1 / span 2" : "auto",
                maxWidth: expandedIndex === index ? "100%" : "100%",
              }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
              <AnimatePresence>
                {expandedIndex !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                  >
                    <span className="text-lepiajeWhite text-lg font-semibold">
                      View
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-40"
            onClick={handleOverlayClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

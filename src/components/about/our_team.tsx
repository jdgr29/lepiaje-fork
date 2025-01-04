"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimateOnScroll } from "../animate_view_on_scroll/animate_view_on_scroll";
import { getImages } from "@/utils/get_images_on_folder";
import { motion } from "framer-motion";

interface OurTeamImagesProps {
  folderName: string;
}

export function OurTeam({ folderName }: OurTeamImagesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<
    {
      name: string;
      role: string;
      image: string;
      bio: string;
    }[]
  >([]);

  useEffect(() => {
    async function loadImages() {
      const imageUrls = await getImages(folderName);
      const teamMembers = [
        {
          name: "Name here",
          role: "Role here",
          image: imageUrls[0],
          bio: "some words and descriptions of what they do or how contributed",
        },
        {
          name: "Name here",
          role: "Role here",
          image: imageUrls[1],
          bio: "some words and descriptions of what they do or how contributed",
        },
        {
          name: "Name here",
          role: "Role here",
          image: imageUrls[2],
          bio: "some words and descriptions of what they do or how contributed",
        },
        {
          name: "Name here",
          role: "Role here",
          image: imageUrls[3],
          bio: "some words and descriptions of what they do or how contributed",
        },
      ];
      setTeamMembers(teamMembers);
    }
    loadImages();
  }, [folderName]);

  return (
    <AnimateOnScroll
      index={2}
      className="py-16 sm:py-24 bg-gradient-to-b  bg-gray-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-gray-100">
          Meet Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-slate-950 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="transition-opacity duration-300"
                  fill
                  style={{
                    opacity: hoveredIndex === index ? 0.7 : 1,
                    objectFit: "cover",
                  }}
                />
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p className="text-white text-sm">{member.bio}</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-100 mb-2">
                  {member.name}
                </h3>
                <p className="text-amber-400 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}

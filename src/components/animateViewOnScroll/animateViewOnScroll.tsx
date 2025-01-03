"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  index: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  index,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const inView = useInView(ref, {
    once: true,
    margin: isMobile ? "-100px" : "0px",
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1, x: 0 });
    }
  }, [controls, inView]);

  const direction = index % 2 === 0 ? 100 : -100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : direction }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

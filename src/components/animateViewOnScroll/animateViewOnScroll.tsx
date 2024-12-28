"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const direction = index % 2 === 0 ? 600 : -600;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, x: direction }}
      animate={
        inView
          ? { opacity: 1, scale: 1, x: 0 }
          : { opacity: 0, scale: 0.5, x: direction }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

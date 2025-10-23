"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const AnimatedSnowflake = ({ className = "" }) => {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden`}
      initial={{ y: 0 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <Image
        src="/snowflakes.webp"
        width={750}
        height={750}
        alt="Snowflakes"
        className={cn("absolute opacity-50", className)}
      />
    </motion.div>
  );
};

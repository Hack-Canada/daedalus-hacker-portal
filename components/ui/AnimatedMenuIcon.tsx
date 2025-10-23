"use client";

import { motion } from "framer-motion";

const lineVariants = {
  closed: { rotate: 0, y: 0 },
  open: (index: number) => ({
    rotate: index === 0 ? 405 : -405,
    y: index === 0 ? 6 : -6,
  }),
};

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative size-6">
      {[0, 1].map((index) => (
        <motion.div
          key={index}
          className="absolute h-0.5 w-6 rounded-full bg-foreground"
          style={{
            originX: 0.5,
            originY: 0.5,
            top: index === 0 ? "25%" : "75%",
          }}
          variants={lineVariants}
          custom={index}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedMenuIcon;

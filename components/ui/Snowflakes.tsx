import { motion } from "framer-motion";

export const Snowflakes = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 24 + 12;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const x = Math.random() * 100;
        const startY = Math.random() * 100 - 10;

        return (
          <motion.div
            key={i}
            className="absolute text-white"
            style={{
              left: `${x}%`,
              top: `${startY}%`,
              fontSize: `${size}px`,
            }}
            initial={{
              y: `${startY}%`,
              x: `${x}%`,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: "110%",
              x: [`${x}%`, `${x + (Math.random() * 20 - 10)}%`],
              opacity: [0.3, 0.75, 0.75, 0.75, 0.3],
              rotate: [0, 360],
              scale: [0, 0.5, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatDelay: 0,
              ease: [0.5, 0.71, 1, 1],
            }}
          >
            ❄️
          </motion.div>
        );
      })}
    </div>
  );
};

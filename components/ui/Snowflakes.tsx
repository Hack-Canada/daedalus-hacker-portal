import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Snowflake = {
  i: number;
  size: number;
  duration: number;
  delay: number;
  x: number;
  startY: number;
  drift: number;
};

export const Snowflakes = () => {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 24 + 12;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const x = Math.random() * 100;
      const startY = Math.random() * 100 - 10;
      const drift = x + (Math.random() * 20 - 10);

      return { i, size, duration, delay, x, startY, drift };
    });

    setFlakes(newFlakes);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
      {flakes.map((flake) => {

        return (
          <motion.div
            key={flake.i}
            className="absolute text-white"
            style={{
              left: `${flake.x}%`,
              top: `${flake.startY}%`,
              fontSize: `${flake.size}px`,
            }}
            initial={{
              y: `${flake.startY}%`,
              x: `${flake.x}%`,
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: "110%",
              x: [`${flake.x}%`, `${flake.drift}%`],
              opacity: [0.3, 0.75, 0.75, 0.75, 0.3],
              rotate: [0, 360],
              scale: [0, 0.5, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
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

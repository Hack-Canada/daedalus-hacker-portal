import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type SnowflakeData = {
  i: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  isLarge: boolean;
};

const AuthCardWrapper = ({ children, className }: Props) => {
  const [snowflakes, setSnowflakes] = useState<SnowflakeData[]>([]);

  useEffect(() => {
    const newSnowflakes = Array.from({ length: 10 }).map((_, i) => ({
      i,
      top: Math.random() * 90,
      left: Math.random() * 90,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
      isLarge: i % 3 === 0,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect -- intended: we are doing client side only so SSR hydration mismatch error is not an issue
    setSnowflakes(newSnowflakes);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full space-y-4 rounded-md border border-white/50 bg-gradient-to-b from-white/50 to-white/50 p-4 shadow-md backdrop-blur-sm md:space-y-6 md:to-[#0A1F44]/10 md:p-8 xl:p-10",
        className,
      )}
    >
      {children}
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.i}
          className={`absolute animate-snow-float text-white/20 ${flake.isLarge ? "h-4 w-4" : "h-3 w-3"}`}
          style={{
            top: `${flake.top}%`,
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AuthCardWrapper;

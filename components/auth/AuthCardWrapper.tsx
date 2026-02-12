"use client";

import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";

type Props = {
  children: React.ReactNode;
  className?: string;
  showTabs?: boolean;
};

type SnowflakeData = {
  i: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  isLarge: boolean;
};

const AuthCardWrapper = ({ children, className, showTabs = true }: Props) => {
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
        "relative w-full rounded-2xl p-8 shadow-2xl md:p-10",
        // Fixed height for auth pages with tabs to prevent layout shift
        showTabs && "min-h-[620px] md:min-h-[640px]",
        // Glassmorphism effect
        "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
        "backdrop-blur-xl backdrop-saturate-150",
        // Border with gradient
        "border border-white/20",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50 before:pointer-events-none",
        // Shadow and glow
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
        className,
      )}
    >
      
      {/* Content with proper text color */}
      <div className="relative z-10 flex flex-col gap-6 text-white">
        {showTabs && <Tabs />}
        {children}
      </div>
      
      {/* Floating snowflakes */}
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.i}
          className={`animate-snow-float absolute text-white/15 pointer-events-none ${flake.isLarge ? "h-4 w-4" : "h-3 w-3"}`}
          style={{
            top: `${flake.top}%`,
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
};

export default AuthCardWrapper;

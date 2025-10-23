import { Snowflake } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AuthCardWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "relative w-full space-y-4 rounded-md border border-white/50 bg-gradient-to-b from-white/50 to-white/50 p-4 shadow-md backdrop-blur-sm md:space-y-6 md:to-[#0A1F44]/10 md:p-8 xl:p-10",
        className,
      )}
    >
      {children}
      {[...Array(10)].map((_, i) => (
        <Snowflake
          key={i}
          className={`absolute animate-snow-float text-white/20 ${i % 3 === 0 ? "h-4 w-4" : "h-3 w-3"}`}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            animationDuration: `${Math.random() * 6 + 6}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AuthCardWrapper;

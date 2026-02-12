"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Tabs() {
  const pathname = usePathname();
  const isSignIn = pathname?.includes("sign-in");
  const isSignUp = pathname?.includes("sign-up");

  return (
    <div className="relative flex w-fit rounded-full border border-white/30 bg-white/10 p-1 backdrop-blur-sm">
      {/* Animated background indicator */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-white"
        initial={false}
        animate={{
          left: isSignUp ? "50%" : "4px",
          right: isSignUp ? "4px" : "50%",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <Link
        href="/sign-in"
        className={cn(
          "relative z-10 cursor-pointer px-5 py-2 text-sm font-medium transition-colors duration-200 md:px-6 md:text-base",
          isSignIn ? "text-black" : "text-white/60 hover:text-white/80",
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "relative z-10 cursor-pointer px-5 py-2 text-sm font-medium transition-colors duration-200 md:px-6 md:text-base",
          isSignUp ? "text-black" : "text-white/60 hover:text-white/80",
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

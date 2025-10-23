"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Tabs() {
  const pathname = usePathname();

  return (
    <div className="absolute left-1/2 top-16 flex w-fit -translate-x-1/2 gap-4 rounded-full border-2 border-white bg-white/50 p-1 backdrop-blur-sm md:top-20">
      <Link
        href="/sign-in"
        className={cn(
          "relative px-3 py-1 text-sm font-medium transition-colors hover:text-textSecondary md:px-4 md:py-1.5 md:text-base",
          pathname?.includes("sign-in") ? "text-textPrimary" : "text-zinc-500",
        )}
      >
        {pathname?.includes("sign-in") && (
          <motion.div
            layoutId="background"
            className="absolute inset-0 rounded-full bg-white/75"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative">Sign In</span>
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "relative px-3 py-1 text-sm font-medium transition-colors hover:text-textSecondary md:px-4 md:py-1.5 md:text-base",
          pathname?.includes("sign-up") ? "text-textPrimary" : "text-zinc-500",
        )}
      >
        {pathname?.includes("sign-up") && (
          <motion.div
            layoutId="background"
            className="absolute inset-0 rounded-full bg-white/75"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative">Sign Up</span>
      </Link>
    </div>
  );
}

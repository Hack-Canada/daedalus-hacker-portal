import Image from "next/image";
import Link from "next/link";

import { AnimatedSnowflake } from "@/components/ui/AnimatedSnowflake";
import { Tabs } from "@/components/ui/tabs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1F44] via-slate-200 to-white px-4 pb-12 pt-28 md:pb-20 md:pt-36">
      {/* Aurora background */}
      <Image
        src="/aurora.webp"
        width={1000}
        height={20}
        alt="Aurora background"
        className="pointer-events-none absolute right-0 top-0 w-[90%] animate-aurora object-contain opacity-90"
      />

      {/* Snowflakes */}

      {/* Additional Animated Snowflakes */}
      <AnimatedSnowflake className="-left-40 -top-40 scale-75" />
      <AnimatedSnowflake className="right-0 top-0" />
      <AnimatedSnowflake className="inset-x-0 bottom-0 scale-150" />

      {/* Grainy texture */}
      <Image
        src="/grainy-texture.jpg"
        fill
        alt="Grainy texture"
        className="pointer-events-none absolute inset-0 object-cover opacity-5"
      />

      {/* <div className="absolute left-4 top-4">
        <BackButton className="border border-transparent text-gray-300 hover:border-white/25 hover:bg-white/10 hover:text-white" />
      </div> */}
      <div className="w-full max-w-sm">
        <Tabs />
        {children}
        <div className="mt-4 text-center">
          <Link
            href="https://hackcanada.org"
            target="_blank"
            className="mx-auto mt-4 text-textMuted transition-colors hover:text-textPrimary"
          >
            Back to landing page
          </Link>
        </div>
      </div>
    </div>
  );
}

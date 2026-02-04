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
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-neutral-900 px-4 pt-28 pb-12 md:pt-36 md:pb-20">
      {/* Aurora background */}
      <Image
        src="/aurora.webp"
        width={1000}
        height={40}
        alt="Aurora background"
        className="animate-aurora pointer-events-none absolute top-0 right-0 w-[100%] object-contain opacity-90"
      />

      {/* Snowflakes */}

      {/* Additional Animated Snowflakes */}
      <AnimatedSnowflake className="-top-40 -left-40 scale-75" />
      <AnimatedSnowflake className="top-0 right-0 scale-150" />
      <AnimatedSnowflake className="inset-x-0 bottom-0 scale-150" />
      <AnimatedSnowflake className="right-0 bottom-0 scale-150 opacity-50" />
      <AnimatedSnowflake className="-right-40 -bottom-40 scale-75 opacity-50" />

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
            className="text-white/60 hover:text-white mx-auto mt-4 transition-colors text-sm"
          >
            Back to landing page
          </Link>
        </div>
      </div>
    </div>
  );
}

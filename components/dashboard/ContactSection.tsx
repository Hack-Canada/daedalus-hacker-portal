import Image from "next/image";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <div className="relative rounded-md border border-gray-300 p-4 shadow-sm md:p-8 xl:p-12">
      <Image
        src="/hills-1.png"
        alt="hills"
        fill
        className="absolute inset-0 -z-10 object-cover blur-sm"
        sizes="200px"
      />

      <span className="absolute left-2 top-2 text-5xl font-light text-black/25 md:text-6xl">
        ?
      </span>

      <div className="space-y-2 px-4">
        <p className="text-xl font-semibold md:text-2xl">Have questions?</p>
        <p className="font-light text-gray-500 md:text-lg">Too late!</p>
      </div>

      <div className="mt-6 space-y-2.5">
        <Link
          href="https://hackcanada.org"
          target="_blank"
          className="block w-full rounded-full border-2 border-zinc-500 px-3 py-2 text-center font-medium transition-all hover:border-black hover:bg-white/25 hover:tracking-widest md:text-lg"
        >
          FAQs
        </Link>
        <Link
          href="mailto:hello@hackcanada.org"
          target="_blank"
          className="block w-full rounded-full border-2 border-zinc-500 px-3 py-2 text-center font-medium transition-all hover:border-black hover:bg-white/25 hover:tracking-widest md:text-lg"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
};

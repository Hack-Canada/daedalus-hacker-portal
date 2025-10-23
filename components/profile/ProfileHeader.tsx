import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  role: string;
  bio?: string | null;
  isOwner: boolean;
}

export function ProfileHeader({
  name,
  role,
  bio,
  isOwner,
}: ProfileHeaderProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-lg md:p-8">
      <Image
        src="/beaver-wave.webp"
        alt="Beaver wave"
        width={200}
        height={200}
        className="pointer-events-none absolute right-5 object-contain max-3xl:top-8 max-sm:w-36 sm:right-10 3xl:bottom-0 3xl:h-full 3xl:w-full 3xl:max-w-64"
      />

      {/* Enhanced layered background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-info/30 to-primaryLight/30 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

        {/* Additional decorative elements */}
        <div className="absolute -left-32 -top-32 size-64 rounded-full bg-primary/20 blur-3xl transition-all duration-700 group-hover:bg-primary/30" />
        <div className="absolute -bottom-32 -right-32 size-64 rounded-full bg-info/20 blur-3xl transition-all duration-700 group-hover:bg-info/30" />
      </div>

      {/* Header Content */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src="/default-avatar.webp"
              alt={name + "'s Avatar"}
              width={48}
              height={48}
              className="aspect-square size-8 rounded-full sm:size-10 lg:size-12"
            />
            <h1 className="shrink-0 translate-y-0.5 font-rubik text-2xl font-black tracking-wider text-textPrimary transition-all duration-500 group-hover:text-black md:text-3xl lg:text-4xl">
              {name}
            </h1>
          </div>
          <span className="inline-block rounded-full bg-gradient-to-r from-primary/10 via-info/10 to-primaryLight/10 px-4 py-1.5 text-sm font-medium capitalize text-textPrimary shadow-sm backdrop-blur-[2px] transition-all duration-500 group-hover:from-primary/20 group-hover:via-info/20 group-hover:to-primaryLight/20 group-hover:shadow-md">
            {role}
          </span>
        </div>

        {isOwner && (
          <Link
            title="Edit Profile"
            aria-label="Edit Profile"
            href="/profile/edit"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className:
                "shrink-0 text-textSecondary shadow-sm transition-all duration-500 hover:scale-105 hover:text-black group-hover:shadow-md",
            })}
          >
            <Pencil className="size-4" />
          </Link>
        )}
      </div>

      {/* Bio Section */}
      <div className="relative overflow-hidden rounded-lg bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-md 3xl:max-w-3xl">
        {bio ? (
          <>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-info/5 to-primaryLight/5 opacity-0 transition-all duration-700 group-hover:opacity-100" />
            <p className="max-h-80 overflow-y-auto whitespace-pre-wrap break-words text-textSecondary transition-all duration-500 group-hover:text-black md:max-h-64">
              {bio}
            </p>
          </>
        ) : (
          <p className="text-sm font-semibold text-textMuted">[No bio added]</p>
        )}
      </div>
    </div>
  );
}

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
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 md:p-8">
      <Image
        src="/beaver-wave.webp"
        alt="Beaver wave"
        width={200}
        height={200}
        className="pointer-events-none absolute right-5 object-contain opacity-60 max-3xl:top-8 max-sm:w-32 sm:right-10 3xl:bottom-0 3xl:h-full 3xl:w-full 3xl:max-w-64"
      />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,144,255,0.08),transparent_55%)]" />
        <div className="absolute -left-20 -top-20 size-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-48 rounded-full bg-info/5 blur-3xl" />
      </div>

      {/* Header Content */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <Image
              src="/default-avatar.webp"
              alt={name + "'s Avatar"}
              width={48}
              height={48}
              className="aspect-square size-10 rounded-full ring-2 ring-primary/20 sm:size-12"
            />
            <h1 className="font-rubik text-2xl font-black tracking-wider text-textPrimary md:text-3xl lg:text-4xl">
              {name}
            </h1>
          </div>
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
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
                "shrink-0 text-textMuted transition-all duration-300 hover:text-primary",
            })}
          >
            <Pencil className="size-4" />
          </Link>
        )}
      </div>

      {/* Bio Section */}
      {bio ? (
        <p className="max-h-48 max-w-3xl overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-textSecondary md:max-h-40">
          {bio}
        </p>
      ) : (
        <p className="text-sm text-textMuted italic">[No bio added]</p>
      )}
    </div>
  );
}

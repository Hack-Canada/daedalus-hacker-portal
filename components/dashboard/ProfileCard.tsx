import Link from "next/link";
import { Snowflake, User } from "lucide-react";

import { buttonVariants } from "../ui/button";
import LockedState from "./LockedState";

interface ProfileCardProps {
  isLocked: boolean;
  userId: string;
}

const ProfileCard = ({ isLocked, userId }: ProfileCardProps) => {
  return (
    <div className="col-span-1 lg:col-span-3">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-0 overflow-hidden rounded-xl border bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 ${
          isLocked
            ? "border-white/10"
            : "hover:border-primary/40 border-white/10 hover:shadow-[0_0_30px_rgba(30,144,255,0.15)]"
        }`}
      >
        {/* Gradient overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
            isLocked
              ? "from-white/5 via-transparent to-transparent opacity-50"
              : "from-primary/10 via-info/5 to-transparent opacity-50 group-hover:opacity-75"
          }`}
        />

        {/* Decorative elements */}
        {!isLocked && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-[300px] left-0 h-14 w-[600px] origin-left -translate-x-60 -rotate-45 border border-white/5 bg-white/5 transition delay-150 duration-700 group-hover:translate-x-0 group-hover:bg-white/10 hover:border-white/10 md:h-20" />
            <Snowflake className="group-hover:text-primary/40 absolute right-2 bottom-2 size-12 rotate-[12deg] text-white/20 transition duration-1000 group-hover:-rotate-[360deg]" />
          </div>
        )}

        {isLocked && <LockedState label="Participants Only" />}

        <div className="relative z-10 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-white">
            Show Off Your Style!
          </h2>
          <User className="group-hover:text-primary size-8 text-white/70 transition-transform duration-500 md:size-8" />
        </div>

        <p className="relative z-10 pb-8 text-white/60">
          Make your profile pop! Share your skills, interests, and what makes
          you unique.
        </p>

        <div className="relative z-10 mt-auto flex items-center gap-2">
          <Link
            href={isLocked ? "" : `/profile/${userId}`}
            aria-disabled={isLocked}
            className={buttonVariants({
              variant: isLocked ? "outline" : "primary",
              className: `inline-flex items-center gap-2 ${
                isLocked
                  ? "pointer-events-none cursor-not-allowed text-white/30! opacity-40 hover:bg-transparent"
                  : ""
              }`,
            })}
          >
            Check It Out
            <User className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

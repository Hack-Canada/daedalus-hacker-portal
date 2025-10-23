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
        className={`group relative flex h-full min-h-[250px] flex-col gap-0 rounded-md border-2 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:transition after:absolute after:inset-0 after:-z-20 after:bg-backgroundMuted ${
          isLocked
            ? "border-gray-200/50 before:bg-gradient-to-br before:from-primary/20 before:via-info/30 before:to-primaryLight/20 before:opacity-25"
            : "border-primary/25 before:bg-gradient-to-br before:from-primary/20 before:via-info/30 before:to-primaryLight/30 before:opacity-75 hover:border-primary/50 hover:shadow-2xl hover:shadow-primaryLight/50 hover:before:opacity-100"
        }`}
      >
        {/* Decorative elements */}
        {!isLocked && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-[300px] h-14 w-[600px] origin-left -translate-x-60 -rotate-45 border border-white/5 bg-white/5 transition delay-150 duration-700 hover:border-white/10 group-hover:-translate-x-0 group-hover:bg-white/10 md:h-20" />
            <Snowflake className="absolute bottom-2 right-2 size-12 rotate-12 text-white/20 transition duration-1000 group-hover:-rotate-[360deg] group-hover:text-white/40" />
          </div>
        )}

        {isLocked && <LockedState label="Participants Only" />}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Your Profile
          </h2>
          <User className="size-8 transition-transform duration-500 md:size-8" />
        </div>

        <p className="pb-8 text-textPrimary/70">
          Customize your public profile, share your interests, and connect with
          others through your unique profile page.
        </p>

        <div className="mt-auto flex items-center gap-2">
          <Link
            href={isLocked ? "" : `/profile/${userId}`}
            aria-disabled={isLocked}
            className={buttonVariants({
              variant: isLocked ? "outline" : "primary",
              className: `inline-flex items-center gap-2 ${
                isLocked
                  ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent"
                  : ""
              }`,
            })}
          >
            My Profile
            <User className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

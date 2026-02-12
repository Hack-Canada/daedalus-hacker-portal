"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import { LogoutButton } from "../auth/LoginButton";

type SidebarUserProps = {
  dark?: boolean;
};

const SidebarUser = ({ dark = true }: SidebarUserProps) => {
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <div className="z-10 space-y-6 pb-12">
      <div className="flex items-center space-x-2">
        <div className={cn(
          "w-full border-t-2",
          dark ? "border-white/30" : "border-primary"
        )} />
        <Image 
          src="/blue-leaf.png" 
          alt="Leaf" 
          width={16} 
          height={16}
          className={dark ? "opacity-70 brightness-150" : ""}
        />
      </div>
      <div className="flex space-x-4">
        <Image
          src="/default-avatar.webp"
          alt={data.user.name + "'s Avatar"}
          width={64}
          height={64}
          className={cn(
            "aspect-square size-14 rounded-full border",
            dark ? "border-white/30" : "border-border"
          )}
        />
        <div className="space-y-1">
          <div className={cn(
            "font-semibold",
            dark ? "text-white" : "text-textPrimary"
          )}>
            {data.user.name}
          </div>
          <div className="relative">
            <LogoutButton
              label="Log Out"
              icon={<LogOut className="size-5" />}
              className={cn(
                "peer h-fit p-0",
                dark ? "text-white/70 hover:text-white" : "text-primary"
              )}
            />
            <span className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform peer-hover:scale-x-100",
              dark ? "bg-white" : "bg-primary"
            )} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;

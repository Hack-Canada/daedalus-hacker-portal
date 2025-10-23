"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

import { LogoutButton } from "../auth/LoginButton";

const SidebarUser = () => {
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <div className="z-10 space-y-6 pb-12">
      <div className="flex items-center space-x-2">
        <div className="w-full border-t-2 border-primary"></div>
        <Image src="/blue-leaf.png" alt="Leaf" width={16} height={16} />
      </div>
      <div className="flex space-x-4">
        <Image
          src="/default-avatar.webp"
          alt={data.user.name + "'s Avatar"}
          width={64}
          height={64}
          className="aspect-square size-14 rounded-full border"
        />
        <div className="space-y-1">
          <div className="font-semibold">{data.user.name}</div>
          <div className="relative">
            <LogoutButton
              label="Log Out"
              icon={<LogOut className="size-5" />}
              className="peer h-fit p-0 text-primary"
            />
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform peer-hover:scale-x-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarUser;

"use client";

import { useSession } from "next-auth/react";

import { navigation } from "@/config/navigation";

import SidebarNavLink from "./SidebarNavLink";

type SidebarNavProps = {
  setIsOpen?: (open: boolean) => void;
};

const SidebarNav = ({ setIsOpen }: SidebarNavProps) => {
  const { data } = useSession();

  return (
    <nav className="flex flex-col gap-4">
      {navigation.map((item) => {
        if (item.href === "/profile") {
          const updatedHref = item.href + "/" + data?.user.id;

          return (
            <SidebarNavLink
              key={item.href}
              {...item}
              href={updatedHref}
              setIsOpen={setIsOpen}
            />
          );
        }

        return (
          <SidebarNavLink key={item.href} {...item} setIsOpen={setIsOpen} />
        );
      })}
    </nav>
  );
};

export default SidebarNav;

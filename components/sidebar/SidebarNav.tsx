"use client";

import { useSession } from "next-auth/react";

import { navigation } from "@/config/navigation";
import { isVolunteer } from "@/lib/utils";

import SidebarNavLink from "./SidebarNavLink";

type SidebarNavProps = {
  setIsOpen?: (open: boolean) => void;
  dark?: boolean;
};

const SidebarNav = ({ setIsOpen, dark = true }: SidebarNavProps) => {
  const { data } = useSession();
  const userRole = data?.user?.role;

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) => {
    // If item requires volunteer role, check if user has it
    if ("requiresVolunteer" in item && item.requiresVolunteer) {
      return userRole && isVolunteer(userRole);
    }
    return true;
  });

  return (
    <nav className="flex flex-col gap-4">
      {filteredNavigation.map((item) => {
        if (item.href === "/profile") {
          const updatedHref = item.href + "/" + data?.user.id;

          return (
            <SidebarNavLink
              key={item.href}
              {...item}
              href={updatedHref}
              setIsOpen={setIsOpen}
              dark={dark}
            />
          );
        }

        return (
          <SidebarNavLink key={item.href} {...item} setIsOpen={setIsOpen} dark={dark} />
        );
      })}
    </nav>
  );
};

export default SidebarNav;

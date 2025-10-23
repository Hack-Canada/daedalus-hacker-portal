"use client";

import { ReactNode } from "react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type Props = {
  title?: string;
  label?: string;
  className?: string;
  icon?: ReactNode;
};

export const LogoutButton = ({
  title,
  className,
  label = "Sign Out",
  icon,
}: Props) => {
  return (
    <Button
      variant="unstyled"
      title={title ? "Logout" : undefined}
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
      className={cn(className)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  );
};

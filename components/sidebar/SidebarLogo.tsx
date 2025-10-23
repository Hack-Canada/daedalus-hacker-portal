import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  mobile?: boolean;
};

const SidebarLogo = ({ className, mobile }: Props) => {
  return (
    <Link
      href={"/"}
      className={`flex w-fit items-center space-x-2 ${className}`}
    >
      <Image
        src={"/beaver-wave.webp"}
        alt="Hack Canada Logo"
        width={48}
        height={48}
        className={mobile ? "translate-y-1" : ""}
      />
      <span className="flex max-lg:space-x-1 lg:flex-col lg:-space-y-1">
        <span className="text-xl font-bold text-[#071632] lg:text-lg">
          Hack
        </span>
        <span className="text-xl font-bold text-[#071632] lg:text-lg">
          Canada
        </span>
      </span>
    </Link>
  );
};

export default SidebarLogo;

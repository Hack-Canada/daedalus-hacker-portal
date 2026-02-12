"use client";

import { useState } from "react";

import MobileMenu from "./MobileMenu";
import SidebarLogo from "./sidebar/SidebarLogo";
import AnimatedMenuIcon from "./ui/AnimatedMenuIcon";
import { Button } from "./ui/button";

type Props = {};

const Navbar = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-40 flex h-16 w-full items-center bg-neutral-900 px-4 shadow-lg shadow-black/30 sm:px-6 md:px-8 lg:hidden">
        <div className="flex w-full items-center justify-between gap-4">
          <SidebarLogo className="h-8 w-auto" mobile dark />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={isOpen ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}
          >
            <AnimatedMenuIcon isOpen={isOpen} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;

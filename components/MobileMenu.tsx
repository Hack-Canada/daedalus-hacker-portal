"use client";

import { useEffect } from "react";

import SidebarNav from "./sidebar/SidebarNav";
import SidebarUser from "./sidebar/SidebarUser";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 cursor-pointer bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Menu Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-40 flex w-72 flex-col overflow-hidden bg-neutral-900 shadow-lg shadow-black/40 transition-transform duration-300 max-sm:w-full ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Aurora gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-blue-900/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          
          {/* Content */}
          <div className="relative z-10 mb-16 mt-24 flex h-full w-full flex-col space-y-24 overflow-y-auto px-10">
            <SidebarNav setIsOpen={setIsOpen} dark />
            <SidebarUser dark />
          </div>
          
          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

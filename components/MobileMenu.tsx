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
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Menu Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-40 flex w-72 flex-col overflow-y-auto bg-background shadow-lg shadow-black/25 transition-transform duration-300 max-sm:w-full ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-16 mt-24 flex h-full w-full flex-col space-y-24 px-10">
            <SidebarNav setIsOpen={setIsOpen} />
            <SidebarUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

import Image from "next/image";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarUser from "./SidebarUser";

type Props = {};

const Sidebar = ({}: Props) => {
  return (
    <div className="fixed inset-y-0 z-30 flex w-72 flex-col overflow-y-auto bg-background shadow-lg shadow-black/25 max-lg:hidden">
      <div className="sidebar-content relative flex h-full w-full flex-col space-y-24 px-10 pb-32 pt-24">
        <SidebarLogo />
        <SidebarNav />
        <SidebarUser />
      </div>

      <Image
        src="/sidebar-waves.svg"
        alt="Sidebar waves"
        priority
        width={1}
        height={1}
        className="sidebar-waves pointer-events-none absolute bottom-0 left-0 w-full select-none object-cover"
      />
    </div>
  );
};

export default Sidebar;

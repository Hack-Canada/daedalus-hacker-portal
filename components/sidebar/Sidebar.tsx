import Image from "next/image";

import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarUser from "./SidebarUser";

type Props = {};

const Sidebar = ({}: Props) => {
  return (
    <div className="fixed inset-y-0 z-30 flex w-72 flex-col overflow-hidden bg-neutral-900 shadow-lg shadow-black/40 max-lg:hidden">
      {/* Aurora gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-blue-900/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
      
      {/* Subtle glow at the edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10" />
      
      <div className="sidebar-content relative z-10 flex h-full w-full flex-col space-y-24 px-10 pb-32 pt-24">
        <SidebarLogo />
        <SidebarNav />
        <SidebarUser />
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent" />
    </div>
  );
};

export default Sidebar;

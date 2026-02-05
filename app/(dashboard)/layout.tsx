import Image from "next/image";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen flex-1 bg-[#0a0a0f]">
      {/* Aurora gradient backgrounds */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top aurora glow */}
        <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute -top-1/4 left-1/4 h-[500px] w-[600px] rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
        
        {/* Bottom subtle glow */}
        <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[600px] rounded-full bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 right-1/4 h-[400px] w-[500px] rounded-full bg-gradient-to-tl from-purple-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Grainy texture overlay */}
      <Image
        src="/grainy-texture.jpg"
        fill
        alt=""
        className="pointer-events-none fixed inset-0 object-cover opacity-[0.03]"
      />

      <Sidebar />
      <main className="relative z-10 h-full max-lg:mt-16 lg:ml-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

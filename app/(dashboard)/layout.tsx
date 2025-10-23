import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex-1">
      <Sidebar />
      <main className="h-full max-lg:mt-16 lg:ml-72">
        <Navbar />
        {/* <div className="absolute left-4 top-4">
          <BackButton />
        </div> */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

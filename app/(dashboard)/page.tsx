import type { Metadata } from "next";
import { getCurrentUser } from "@/auth";

import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UnauthorizedState } from "@/components/dashboard/UnauthorizedState";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Home = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <UnauthorizedState />;
  }

  return <DashboardContent user={user} />;
};

export default Home;

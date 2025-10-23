interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "User";

  return (
    <div className="overflow-hidden md:space-y-2">
      <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
        <h1 className="font-rubik text-3xl font-bold md:text-4xl xl:text-5xl">
          Hello, {firstName}.
        </h1>
      </div>
      <p className="text-lg text-textMuted md:text-xl">Welcome back!</p>
    </div>
  );
};

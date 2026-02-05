interface DashboardHeaderProps {
  userName: string;
}

const greetings = [
  { heading: "Hey there", subtitle: "Ready to build something awesome?" },
  { heading: "Welcome back", subtitle: "Let's make some magic happen!" },
  { heading: "Hello", subtitle: "Great to see you again!" },
  { heading: "What's up", subtitle: "Time to hack and have fun!" },
  { heading: "Hi there", subtitle: "Your hackathon adventure awaits!" },
];

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "Hacker";

  // Use a deterministic greeting based on the first letter of the name
  const greetingIndex = firstName.charCodeAt(0) % greetings.length;
  const { heading, subtitle } = greetings[greetingIndex];

  return (
    <div className="overflow-hidden md:space-y-2">
      <div className="from-primary to-primaryLight w-fit bg-linear-to-r via-sky-400 bg-clip-text text-transparent">
        <h1 className="font-rubik text-3xl font-bold md:text-4xl xl:text-5xl">
          {heading}, {firstName}!
        </h1>
      </div>
      <p className="text-lg text-white/50 md:text-xl">{subtitle}</p>
    </div>
  );
};

import { Heart, Sparkles } from "lucide-react";

interface ProfileHobbiesProps {
  hobbies: string;
}

export function ProfileHobbies({ hobbies }: ProfileHobbiesProps) {
  const hobbiesList = hobbies.split(",").map((hobby) => hobby.trim());

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg">
      {/* Enhanced layered background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primaryLight/30 to-info/30 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

        {/* Mesh gradient pattern */}
        <div className="absolute inset-0 opacity-0 mix-blend-normal transition-all duration-700 group-hover:opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
        </div>
      </div>

      {/* Decorative icons */}
      <Heart className="absolute -right-12 -top-12 h-32 w-32 rotate-12 text-primary/5 transition-all duration-500 group-hover:scale-105 group-hover:text-primary/10" />
      <Sparkles className="absolute -bottom-8 -left-8 h-24 w-24 -rotate-12 text-primary/5 transition-all duration-500 group-hover:scale-105 group-hover:text-primary/10" />

      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Heart
          strokeWidth={3}
          className="size-4 fill-primary/25 text-primary transition-transform group-hover:-rotate-12 group-hover:scale-110"
        />
        <h2 className="text-xl font-semibold tracking-wide text-textPrimary">
          Interests and Hobbies
        </h2>
      </div>

      {/* Hobbies list with staggered animation */}
      <div className="flex flex-wrap gap-2">
        {hobbiesList.map((hobby, index) => (
          <span
            key={index}
            className="animate-fadeIn rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-primary/20 hover:shadow-md"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
}

import { Code2 } from "lucide-react";

interface ProfileSkillsProps {
  skills: string[];
}

export function ProfileSkills({ skills }: ProfileSkillsProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,144,255,0.06),transparent_60%)]" />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
          <Code2 strokeWidth={2} className="size-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary/70">
          Skills & Tech Stack
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="animate-fadeIn rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-sm font-medium text-textPrimary transition-all duration-200 hover:border-primary/30 hover:bg-primary/15"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "backwards",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

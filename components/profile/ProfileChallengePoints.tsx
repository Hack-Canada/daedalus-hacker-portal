import { CheckCircle2, Trophy } from "lucide-react";

interface ProfileChallengePointsProps {
  points: number;
  completedCount: number;
}

export function ProfileChallengePoints({
  points,
  completedCount,
}: ProfileChallengePointsProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,144,255,0.07),transparent_60%)]" />
      </div>

      <div className="flex items-center gap-4">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 ring-1 ring-primary/20">
          <Trophy strokeWidth={2} className="size-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
            Challenge Points
          </p>
          <p className="text-2xl font-bold tabular-nums text-textPrimary">
            {points}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 rounded-lg border border-primary/15 bg-primary/8 px-3 py-2">
          <CheckCircle2 strokeWidth={2} className="size-3.5 text-primary/70" />
          <span className="text-sm font-semibold tabular-nums text-textSecondary">
            {completedCount}
          </span>
          <span className="text-xs text-textMuted">done</span>
        </div>
      </div>
    </div>
  );
}

import { MessageCircle } from "lucide-react";

interface ProfileAskMeAboutProps {
  topic: string;
}

export function ProfileAskMeAbout({ topic }: ProfileAskMeAboutProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,144,255,0.07),transparent_60%)]" />
      </div>

      <MessageCircle className="absolute -right-6 -top-6 h-20 w-20 rotate-[12deg] text-primary/5 transition-all duration-500 group-hover:text-primary/10" />

      <div className="flex items-center gap-3">
        <div className="shrink-0 rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
          <MessageCircle strokeWidth={2} className="size-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
            Ask me about
          </p>
          <p className="mt-0.5 truncate text-base font-medium text-textPrimary">
            {topic}
          </p>
        </div>
      </div>
    </div>
  );
}

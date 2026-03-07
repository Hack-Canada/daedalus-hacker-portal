import { ExternalLink, Rocket } from "lucide-react";

import { devpostUrl } from "@/config/site";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";

const DevpostCard = () => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div className="group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(30,144,255,0.15)]">
        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-white">
            Submit on Devpost!
          </h2>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/20">
            <Rocket className="size-5 text-primary" />
          </div>
        </div>

        <p className="relative z-10 pb-2 text-white/60">
          Register your team, submit your project, and compete for prizes!
          All submissions go through Devpost — make sure every team member
          is signed up.
        </p>

        <div className="relative z-10 mt-auto flex items-center gap-2">
          <a
            href={devpostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "primary",
              className: "inline-flex items-center gap-2",
            })}
          >
            Open Devpost
            <ExternalLink className="size-4" />
          </a>
        </div>

        <CardDecorativeElements isLocked={false} />
      </div>
    </div>
  );
};

export default DevpostCard;

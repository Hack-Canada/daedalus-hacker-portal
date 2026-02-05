import { Lock } from "lucide-react";

type Props = {
  label?: string;
};

const LockedState = ({ label = "Hackers Only" }: Props) => {
  return (
    <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2 rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm md:bottom-4 md:right-4">
      <Lock className="h-3.5 w-3.5 text-white/50" />
      <p className="text-xs font-medium text-white/50">{label}</p>
    </div>
  );
};
export default LockedState;

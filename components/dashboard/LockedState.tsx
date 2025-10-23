import { Lock } from "lucide-react";

type Props = {
  label?: string;
};

const LockedState = ({ label = "Hackers Only" }: Props) => {
  return (
    <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-gray-100/10 px-2 py-1 md:bottom-4 md:right-4">
      <Lock className="h-3.5 w-3.5 text-gray-400" />
      <p className="text-xs font-medium text-gray-400">{label}</p>
    </div>
  );
};
export default LockedState;

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-lg space-y-6 px-4 pb-16 pt-12 md:space-y-8 md:px-8 md:pb-20 md:pt-16 lg:space-y-10 lg:px-12 lg:py-20 xl:px-16 xl:py-28 2xl:py-32 3xl:max-w-screen-xl",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default PageWrapper;

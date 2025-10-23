const CardDecorativeElements = ({ isLocked }: { isLocked: boolean }) => {
  return (
    <>
      <div
        className={`ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-16 -top-16 size-32 rotate-12 rounded-lg ${isLocked ? "bg-gray-200/30" : "bg-primaryLight/20"} transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-80`}
      />
      <div
        className={`ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-8 -top-8 size-24 rotate-12 rounded-lg ${isLocked ? "bg-gray-200/15" : "bg-primaryLight/10"} transition-all duration-500 group-hover:translate-y-1 group-hover:scale-110 group-hover:opacity-80`}
      />
    </>
  );
};
export default CardDecorativeElements;

type Props = {
  heading: string;
  description: string;
  status: ApplicationStatus | "coming_soon";
};

const statusGradients = {
  not_applied: "from-primary via-sky-400 to-primaryLight",
  pending: "from-primary via-sky-400 to-primaryLight",
  accepted: "from-green-400 via-emerald-300 to-green-400",
  rejected: "from-red-400 via-red-300 to-red-400",
  waitlisted: "from-amber-400 via-yellow-300 to-amber-400",
  coming_soon: "from-primary via-sky-400 to-primaryLight",
  cancelled: "from-red-400 via-red-300 to-red-400",
};

const ApplicationStatusHeader = ({ heading, status, description }: Props) => {
  return (
    <div
      className={`mb-6 mt-4 w-fit bg-linear-to-r font-rubik ${statusGradients[status]} bg-clip-text text-transparent`}
    >
      <h1 className="pb-2 text-2xl font-semibold md:text-3xl">{heading}</h1>
      <p className="text-white/60 max-md:text-sm">{description}</p>
    </div>
  );
};

export default ApplicationStatusHeader;

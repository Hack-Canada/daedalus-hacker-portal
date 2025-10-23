type Props = {
  heading: string;
  description: string;
  status: ApplicationStatus | "coming_soon";
};

const statusGradients = {
  not_applied: "from-primary via-sky-500 to-primary",
  pending: "from-primary via-sky-500 to-primary",
  accepted: "from-primary via-sky-400 to-primary",
  rejected: "from-red-400 via-red-500 to-red-400",
  waitlisted: "from-secondary/80 via-amber-400 to-secondary",
  coming_soon: "from-primary via-sky-500 to-primary",
  cancelled: "from-red-400 via-red-500 to-red-400",
};

const ApplicationStatusHeader = ({ heading, status, description }: Props) => {
  return (
    <div
      className={`mb-6 mt-4 w-fit bg-gradient-to-r font-rubik ${statusGradients[status]} bg-clip-text text-transparent`}
    >
      <h1 className="pb-2 text-2xl font-semibold md:text-3xl">{heading}</h1>
      <p className="text-textMuted max-md:text-sm">{description}</p>
    </div>
  );
};

export default ApplicationStatusHeader;

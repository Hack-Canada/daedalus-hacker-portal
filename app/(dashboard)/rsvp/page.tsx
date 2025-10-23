import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getUserAcceptedTime } from "@/lib/db/queries/user";
import PageWrapper from "@/components/PageWrapper";
import RSVPForm from "@/components/RSVPForm";

const RSVPPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    redirect("/");
  }

  // Ensure that the user is qualified to RSVP
  // - user must be accepted
  // - user must not ALREADY be a hacker
  const canRsvp =
    currentUser?.status === "accepted" && currentUser.role !== "hacker";

  if (!canRsvp) {
    redirect("/");
  }

  const acceptedAt = await getUserAcceptedTime(currentUser.id);

  if (!acceptedAt) {
    redirect("/");
  }

  // Calculate the 7 days from the acceptedAt date
  const sevenDaysLater = new Date(acceptedAt);
  sevenDaysLater.setDate(sevenDaysLater.getDate() + 8);

  // Format the date for display
  const sevenDaysLaterFormatted = sevenDaysLater.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // TODO (maybe): If exactly 7 days has passed, process an automatic rejection

  return (
    <PageWrapper className="3xl:max-w-screen-lg">
      <div className="mb-8">
        <div className="mb-2 w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h1 className="font-rubik text-3xl font-bold md:text-4xl">RSVP</h1>
        </div>
        <p className="mb-1 max-w-3xl text-textMuted max-md:text-sm">
          Congratulations {currentUser.name?.split(" ")[0]}! Welcome to Hack
          Canada! To confirm your acceptance, please complete the form below by{" "}
          {sevenDaysLaterFormatted}.
        </p>
      </div>

      <RSVPForm />
    </PageWrapper>
  );
};

export default RSVPPage;

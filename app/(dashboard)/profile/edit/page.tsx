import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { getProfileWithUser } from "@/lib/db/queries/profile";
import { BackButton } from "@/components/ui/back-button";
import PageWrapper from "@/components/PageWrapper";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  // Only assigned users can have profiles (e.g. hackers, orgs, mentors)
  if (user.role === "unassigned") {
    redirect("/");
  }

  const profile = await getProfileWithUser(user.id);

  return (
    <PageWrapper className="max-w-screen-lg 3xl:max-w-screen-lg">
      <div className="mb-8">
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h1 className="font-rubik text-2xl font-bold text-transparent md:text-3xl">
            Edit Profile
          </h1>
        </div>
        <p className="text-muted-foreground">
          Update your profile to share your interests, hobbies, and connect with
          others during the hackathon!
        </p>
      </div>

      <ProfileForm
        initialData={
          profile
            ? {
                bio: profile.bio,
                hobbies: profile.hobbies || "",
                integrations: profile.integrations,
              }
            : undefined
        }
      />
      <BackButton />
    </PageWrapper>
  );
}

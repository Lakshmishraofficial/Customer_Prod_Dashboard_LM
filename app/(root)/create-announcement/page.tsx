import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <Suspense
      fallback={<h1 className="text-light-1 text-heading3-bold">Preparing Your Experience...</h1>}
    >
      <>
        <h1 className="head-text">Create Announcement</h1>

        <PostThread userId={userInfo._id} />
      </>
    </Suspense>
  );
}

export default Page;

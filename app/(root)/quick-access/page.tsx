"use server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import HolidaysPage from "@/components/holidays";
import WorkingRemotely from "@/components/WorkingRemotely";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import AttendanceCard from "@/components/AttendanceCard";

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No content found</p>
        ) : (
          <>
            <h3 className="head-text text-xl text-left">Quick Access</h3>
            <HolidaysPage />
            <WorkingRemotely currentUserId={user.id}  />
            <AttendanceCard currentUserId={user.id} />
          </>
        )}
      </section>
    </>
  );
}

export default page;

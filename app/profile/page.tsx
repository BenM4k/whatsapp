import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import ProfileComponent from "./_components/profile";

export default async function Profile() {
  const { userId } = await auth();
  const preloadedUSerInfo = await preloadQuery(api.users.readUSer, {
    userId: userId!,
  });
  return (
    <main className="flex flex-col h-screen bg-[#111B21] text-[#E9EDEF]">
      <ProfileComponent user={preloadedUSerInfo} />
    </main>
  );
}

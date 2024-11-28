import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import ChatLayoutWrapper from "./_components/chat-layout-wrapper";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const preloadedUser = await preloadQuery(api.users.readUSer, {
    userId: userId!,
  });
  const preloadedConversations = await preloadQuery(api.chats.getConversation, {
    userId: userId!,
  });
  return (
    <ChatLayoutWrapper
      user={preloadedUser}
      preloadedConversations={preloadedConversations}
    >
      {children}
    </ChatLayoutWrapper>
  );
}

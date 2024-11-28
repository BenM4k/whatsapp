"use client";

import LoadingState from "@/components/loading";
import SideBar from "@/components/sidebar";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Preloaded, usePreloadedQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
  user: Preloaded<typeof api.users.readUSer>;
  preloadedConversations: Preloaded<typeof api.chats.getConversation>;
};

export default function ChatLayoutWrapper({
  preloadedConversations,
  user,
  children,
}: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const [shouldShowLoading, setShouldShowLoading] = useState(true);

  const userInfo = usePreloadedQuery(user);
  const conversations = usePreloadedQuery(preloadedConversations);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading =
    !isLoaded ||
    userInfo === undefined ||
    shouldShowLoading ||
    conversations === undefined;

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background dark:bg-[#111B21] overflow-hidden">
      <SideBar user={user} preloadedConversations={preloadedConversations} />
      <Header>{children}</Header>
    </div>
  );
}

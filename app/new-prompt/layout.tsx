"use client";

import { useSession } from "next-auth/react";
import SignInToAccessSection from "@/components/SignInToAccessSection";
import SectionLoader from "@/components/Loader/SectionLoader";

export default function NewPromptLayout({ children }: { children: React.ReactNode }) {
  // Status will store the next-auth status
  const { status } = useSession();

  if (status === "loading") return <SectionLoader />;
  if (status === "unauthenticated") return <SignInToAccessSection />;
  return children;
};

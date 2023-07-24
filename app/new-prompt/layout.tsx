"use client";

import { useSession } from "next-auth/react"
import SignInToAccessSection from "@/components/SignInToAccessSection";

export default function NewPromptLayout({ children }: { children: React.ReactNode }) {
  // Define session which store auth
  const { status } = useSession();

  return (
    status === "authenticated"
      ? children
      : <SignInToAccessSection />
  );
}

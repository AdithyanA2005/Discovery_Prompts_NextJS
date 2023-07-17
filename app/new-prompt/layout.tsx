"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewPromptLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) router.push("/");
  }, [session, router]);

  return (
    session?.user
      ? children
      : <div className="flex justify-center mt-16"><span className="bg-primary loading loading-bars loading-lg mx-auto"></span></div>
  )
}

"use client"

import Loader from "@/components/Loader";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) router.push("/");
  }, [session, router]);

  return (
    session?.user
      ? children
      : <Loader />
  )
}

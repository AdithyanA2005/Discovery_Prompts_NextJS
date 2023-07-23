
"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // Define router to navigate within pages
  const router = useRouter();

  // Define session which store auth
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

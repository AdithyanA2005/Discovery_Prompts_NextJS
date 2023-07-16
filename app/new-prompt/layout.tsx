"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function NewPromptLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {data: session } = useSession();

  return (
    session?.user ? children : router.push("/")
  )
}
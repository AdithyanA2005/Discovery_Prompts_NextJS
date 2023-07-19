"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  session?: Session;
};

// Next Auth Session Provider Component
export default function AuthSessionProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

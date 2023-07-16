"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import SpecialBtn from "./SpecialBtn";
import AccountActionsDropdown from "./AccountActionsDropdown";

interface NextAuthProvidersResponse {
  [provider: string]: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
}

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<NextAuthProvidersResponse | null>(null);

  // Get and setup the providers
  useEffect(() => {
    const getAndSetUpProviders = async () => {
      const response: NextAuthProvidersResponse | null = await getProviders();
      setProviders(response);
    };

    getAndSetUpProviders();
  }, []);

  return (
    <nav className="navbar justify-between mt-2 h-10 bg-base-100">
      {/* Navbrand */}
      <Link href="/" className="btn btn-ghost hover:border btn-accent hover:text-accent outline-none font-bold">
        <span className="text-lg sm:text-lg hidden sm:block">Discovery Prompts</span>
        <span className="text-2xl sm:hidden font-serif">DP</span>
      </Link>

      {/* Actions */}
      <div className="flex-none">
        {status === "authenticated" ? (
          <div className="flex items-center">
            {/* Write new prompt button */}
            <SpecialBtn
              text="Write New Prompt"
              onClick={() => router.push("/new-prompt")}
              disabled={false}
            />

            {/* Account actions dropdown with profile img btn*/}
            <AccountActionsDropdown
              userImage={session.user.image ?? undefined}
              userName={session.user.name ?? undefined}
            />
          </div>
        ) : (
          <div>
            <SpecialBtn
              text="Start Discovering"
              onClick={() => signIn(providers?.google.id)}
              disabled={!providers || !providers.google}
            />
          </div>
        )}
      </div>
    </nav >
  )
}

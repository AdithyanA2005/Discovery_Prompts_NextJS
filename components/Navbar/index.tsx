"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import SpecialBtn from "./SpecialBtn";
import AccountActionsDropdown from "./AccountActionsDropdown";
import BackBtn from "./BackBtn";
import NavBrand from "./NavBrand";

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
  const pathname = usePathname();
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
      <div>
        {pathname !== "/" && <BackBtn />}
        <NavBrand />
      </div>

      <div className="flex-none">
        {status === "authenticated" ? (
          <div className="flex items-center">
            {/* Write new prompt button */}
            {pathname !== "/new-prompt" && (
              <SpecialBtn
                text="Write New Prompt"
                onClick={() => router.push("/new-prompt")}
                disabled={false}
              />
            )}

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
    </nav>
  );
}

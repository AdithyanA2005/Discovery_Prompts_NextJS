"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";
import AccountActionsDropdown from "./AccountActionsDropdown";
import SpecialBtn from "./SpecialBtn";
import NavBrand from "./NavBrand";
import BackBtn from "./BackBtn";
import { toast } from "react-toastify";

interface NextAuthProvidersResponse {
  [provider: string]: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};

export default function Navbar() {
  // Router to navigate within pages
  const router = useRouter();

  // The current pathname or route
  const pathname = usePathname();

  // Define session which store auth
  const { data: session, status } = useSession();

  // NextAuth Authentication Providers
  const [providers, setProviders] = useState<NextAuthProvidersResponse | null>(null);

  // Get NextAuth providers and set it to state variable
  useEffect(() => {
    const getAndSetUpProviders = async () => {
      const response: NextAuthProvidersResponse | null = await getProviders();
      setProviders(response);
    };

    getAndSetUpProviders();
  }, []);

  // When authenticated it will show a success toast
  useEffect(() => {
    if (status === "authenticated") {
      toast.success(`Succcessfully logged in as ${session?.user.name}`);
    };
  }, [status]);

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
              text="Log In / Register"
              onClick={() => signIn(providers?.google.id)}
              disabled={!providers || !providers.google}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

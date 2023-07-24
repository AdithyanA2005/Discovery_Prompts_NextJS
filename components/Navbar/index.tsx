"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useProviders from "@/hooks/useProviders";
import AccountActionsDropdown from "./AccountActionsDropdown";
import SpecialBtn from "./SpecialBtn";
import NavBrand from "./NavBrand";
import BackBtn from "./BackBtn";


export default function Navbar() {
  // Router to navigate within pages
  const router = useRouter();

  // The current pathname or route
  const pathname = usePathname();

  // Define session which store auth
  const { data: session, status } = useSession();

  // NextAuth Authentication Providers
  const providers = useProviders();

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
              />
            )}

            {/* Account actions dropdown with profile img btn*/}
            <AccountActionsDropdown
              userImage={session.user.image ?? undefined}
              userName={session.user.name ?? undefined}
              userId={session.user.id ?? undefined}
            />
          </div>
        ) : (
          <div>
            <SpecialBtn
              text="Log In / Register"
              onClick={() => signIn(providers?.google.id)}
              disabled={!providers || !providers.google}
              loading={status === "loading"}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

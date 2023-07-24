"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";

type Props = {};

interface NextAuthProvidersResponse {
  [provider: string]: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};

export default function SignInToAccessSection({ }: Props) {
  // The current pathname or route
  const pathname = usePathname();

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

  return (
    <section className="mt-[10vh] flex items-center justify-center flex-col">
      <div className="flex flex-col gap-14 items-center border-2 border-primary rounded-2xl bg-black/30 px-14 py-16">
        <h1 className="text-gray-300 text-4xl font-semibold">
          Please SignIn to access the page
        </h1>

        <button
          onClick={() => signIn(providers?.google.id, {callbackUrl: pathname})}
          disabled={!providers || !providers.google}
          className="btn btn-primary btn-lg w-full max-w-sm">
          Sign In / Register
        </button>
      </div>
    </section>
  );
}

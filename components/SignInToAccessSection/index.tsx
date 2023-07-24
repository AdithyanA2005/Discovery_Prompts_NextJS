"use client";

import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import useProviders from "@/hooks/useProviders";

type Props = {};

export default function SignInToAccessSection({ }: Props) {
  // The current pathname or route
  const pathname = usePathname();

  // NextAuth Authentication Providers
  const providers = useProviders();

  return (
    <section className="mt-[10vh] flex items-center justify-center flex-col">
      <div className="flex flex-col gap-14 items-center border-2 border-primary rounded-2xl bg-black/30 px-14 py-16">
        <h1 className="text-gray-300 text-4xl font-semibold">
          Please SignIn to access the page
        </h1>

        <button
          onClick={() => signIn(providers?.google.id, { callbackUrl: pathname })}
          disabled={!providers || !providers.google}
          className="btn btn-primary btn-lg w-full max-w-sm"
        >
          Sign In / Register
        </button>
      </div>
    </section>
  );
}

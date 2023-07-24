"use client";

import { useState, useEffect } from "react";
import { getProviders } from "next-auth/react";
import { NextAuthProvidersResponse } from "@/types/next-auth";

// This wil return the list of next auth providers
export default function useProviders(): NextAuthProvidersResponse | null {
  const [providers, setProviders] = useState<NextAuthProvidersResponse | null>(null);

  useEffect(() => {
    const getAndSetUpProviders = async () => {
      const response: NextAuthProvidersResponse | null = await getProviders();
      setProviders(response);
    };

    getAndSetUpProviders();
  }, []);

  return providers;
};


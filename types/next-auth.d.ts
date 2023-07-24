import NextAuth, { DefaultSession } from "next-auth"

export interface NextAuthProvidersResponse {
  [provider: string]: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id?: string;
    } & DefaultSession["user"]
  }
}

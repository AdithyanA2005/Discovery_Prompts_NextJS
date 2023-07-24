import NextAuth from "next-auth/next";
import { Profile, Session } from "next-auth";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { IUser } from "@/types/user";

// Next Auth Providers - Google(Auth0)
const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
];

// Next Auth Session
const session = async ({ session }: { session: Session }) => {
  // Add users id from database to the session user
  const sessionUser: IUser | null = await User.findOne({ email: session?.user?.email });
  session.user.id = sessionUser?._id?.toString();
  return session;
};

// Next Auth SignIn
const signIn = async ({profile}: {profile?: Profile}) => {
  try {
    // Try to connect to the DB
    await connectToDB();

    // Check if the user already exists
    const userExists = await User.findOne({ email: profile?.email });

    // Create new user if not already exists
    if (!userExists) await User.create({
      email: profile?.email,
      name: profile?.name,
      image: profile?.picture,
    });

    // Return true after successful completion
    return true;
  } catch (error) {
    // Return false if any error occured
    console.log(error)
    return false;
  }
};

// Next Auth Handler
const authHandler = NextAuth({
  providers,
  callbacks: {
    session,
    signIn
  }
});

export { authHandler as GET, authHandler as POST }

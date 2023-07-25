import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { IUser } from "@/types/user";

interface Params {
  id: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Find user with a specific id
    const user: IUser | null = await User.findById(params.id);
    
    // Return prompts as response
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    // If any error occured log it and send a err response
    return new Response("Failed to fetch prompts", { status: 500 });
  }
} 

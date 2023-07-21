import Prompt from "@/models/prompt"; 
import { connectToDB } from "@/utils/database";

interface Params {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Fetching prompts created by a specific user
    const prompts = await Prompt.find({ creator: params.id }).populate("creator");

    // Return prompts as response
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch prompts created by user", { status: 500 });
  }
} 

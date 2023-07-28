import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

interface Params {
  id: string;
};

export const GET = async (request: Request, { params }: { params: Params }) => {
  const url = new URL(request.url);
  const page: number = Number(url.searchParams.get("page")) || 1;
  const pageSize: number = Number(url.searchParams.get("pageSize")) || 10;

  try {
    // Try to connect to mongodb
    await connectToDB();

    // Fetching prompts created by a specific user
    const prompts = await Prompt
      .find({ creator: params.id })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("creator");

    // Return prompts as response
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // If any error occured log it and send a err response
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  };
} 

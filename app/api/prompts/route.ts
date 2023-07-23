import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

export async function GET() {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Get list of prompts with the creator field populated
    const prompts: IPromptWithCreatorPopulated[] = await Prompt
      .find({})
      .populate("creator");

    // Return new promts as a response
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // If any error occured log it and send a err response
    return new Response("Failed to fetch prompts", { status: 500 });
  }
}

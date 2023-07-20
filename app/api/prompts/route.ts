import Prompt from "@/models/prompt";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { connectToDB } from "@/utils/database";

export async function GET(request: Request) {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Creating the new prompt in db
    const prompts: IPromptWithCreatorPopulated[] = await Prompt.find({}).populate("creator");

    // Return new promt as a response
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
}
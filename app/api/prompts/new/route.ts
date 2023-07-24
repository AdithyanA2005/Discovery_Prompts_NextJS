import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { ICreatePromptRequestBody } from "@/types/prompt";

export async function POST(request: Request) {
  // Extracting necessary data from request body
  const { userId, prompt, tag }: ICreatePromptRequestBody = await request.json();
  
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Creating the new prompt with extracted data in db
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag });

    // Return new promt as a response
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // If any error occured log it and send a err response
    return new Response("Failed to create a new prompt", { status: 500 });
  };
}

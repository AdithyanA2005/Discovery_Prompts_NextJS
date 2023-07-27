import Prompt from "@/models/prompt";
import { IPrompt, IWritePromptRequestBody } from "@/types/prompt";
import { connectToDB } from "@/utils/database";

interface Params {
  id: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Find the prompt by id
    const promptRemoved = await Prompt.findByIdAndRemove(params.id);

    // If the prompt exists, delete it
    if (promptRemoved) {
      return new Response("Prompt Deleted", { status: 200 });
    } else {
      return new Response("Prompt Not Found", { status: 404 })
    };
  } catch (error) {
    // If any error occured log it and send a err response
    return new Response("Failed to delete the prompt", { status: 500 });
  };
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    // Try to connect to mongodb
    await connectToDB();

    // Find the prompt by id
    const prompt = await Prompt
      .findById(params.id)
      .populate("creator");

    // If prompt with the id does not exists the send not found response
    if (!prompt) return new Response("Prompt does not exist", { status: 404 });

    // If prompt exists then send it as json response
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    // If any error occured log it and send a err response
    return new Response("Failed to fetch the prompt", { status: 500 });
  };
}

export async function PUT(request: Request, { params }: { params: Params }) {
  // Extracting necessary data from request body
  const { userId, prompt, tag }: IWritePromptRequestBody = await request.json();

  try {
    // Try to connect to mongodb
    await connectToDB();

    // Find the prompt by id
    const fetchedPrompt: IPrompt | null = await Prompt.findById(params.id);

    // Send error response if prompt is not found
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    // Send error if prompt is not owned by the user
    if (fetchedPrompt?.creator.toString() !== userId) return new Response("Unauthorised to update", { status: 403 });

    // Update the prompt with new data
    await fetchedPrompt.updateOne({ $set: { tag: tag, prompt: prompt } });

    // If successfull then send the updated prompt as response
    return new Response(JSON.stringify(fetchedPrompt), { status: 200 });
  } catch (error) {
    // If any error occured log it and send a err response
    console.log(error)
    return new Response("Failed to fetch the prompt", { status: 500 });
  };
}

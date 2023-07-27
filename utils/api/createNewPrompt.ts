import { IWritePromptRequestBody, IPromptWithCreatorPopulated } from "@/types/prompt";
import { toast } from "react-toastify";

// This function will create a new prompt and return the created prompt or null
export default async function createNewPrompt(userId: string, promptText: string, tag: string): Promise<IPromptWithCreatorPopulated | null> {
  const reqBody: IWritePromptRequestBody = { prompt: promptText, userId, tag };
  const response: Response = await fetch("/api/prompts/new", {
    method: "POST",
    body: JSON.stringify(reqBody),
  });

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return null;  
  };

  // If response is successfull then show a prompt and return the new prompt
  toast.success("New prompt created");
  const prompt = await response.json();
  return prompt;
};

import { toast } from "react-toastify";
import { IPromptWithCreatorPopulated, IWritePromptRequestBody } from "@/types/prompt";

// This function will update a prompt and return the updated prompt or null
export default async function updatePrompt(promptId: string, userId: string, promptText: string, tag: string): Promise<IPromptWithCreatorPopulated | null> {
  const reqBody: IWritePromptRequestBody = { userId: userId, prompt: promptText, tag: tag };
  const response: Response = await fetch(`/api/prompts/${promptId}`, {
    method: "PUT",
    body: JSON.stringify(reqBody),
  });

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return null;
  };

  // If response is successfull then show a prompt and return the updated prompt
  toast.success("Prompt updated successfully");
  const prompt = await response.json();
  return prompt;
};

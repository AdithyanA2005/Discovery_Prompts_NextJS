import { toast } from "react-toastify";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

// This function will fetch a particular prompt by id
export default async function fetchPrompt(promptId: string): Promise<IPromptWithCreatorPopulated | null> {
  const response: Response = await fetch(`/api/prompts/${promptId}`);

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return null;
  };

  // Convert to json and return the prompts
  const prompt: IPromptWithCreatorPopulated = await response.json();
  return prompt;
};

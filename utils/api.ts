import { ICreatePromptRequestBody, IPromptWithCreatorPopulated } from "@/types/prompt";
import { toast } from "react-toastify";

// This function will fetch and return all prompts
export async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch("/api/prompts");

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return [];
  };

  // Convert to json and return the prompts
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

// This function will fetch and return all prompts by a specific creator
export async function fetchUserPrompts(userId: string): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch(`/api/prompts/user/${userId}`);

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return [];
  };

  // Convert to json and return the prompts
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

// This function will create a new prompt and return the created prompt or null
export async function createNewPrompt(userId: string, promptText: string, tag: string): Promise<IPromptWithCreatorPopulated | null> {
  const reqBody: ICreatePromptRequestBody = { prompt: promptText, userId, tag };
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

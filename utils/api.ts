import { IPromptWithCreatorPopulated } from "@/types/prompt";
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

import { toast } from "react-toastify";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

// This function will fetch and return all prompts
export default async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
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

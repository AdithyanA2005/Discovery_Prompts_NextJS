import { IPromptWithCreatorPopulated } from "@/types/prompt";

// This function will fetch and return all prompts
export async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch("/api/prompts");
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

// This function will fetch and return all prompts by a specific creator
export async function fetchUserPrompts(userId: string): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch(`/api/prompts/user/${userId}`);
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

import { IPromptWithCreatorPopulated } from "@/types/prompt";

export async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch("/api/prompts");
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

export async function fetchUserPrompts(userId: string): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch(`/api/prompts/user/${userId}`);
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  console.log(prompts)
  return prompts;
};

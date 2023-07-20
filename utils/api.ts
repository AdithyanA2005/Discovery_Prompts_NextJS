import { IPromptWithCreatorPopulated } from "@/types/prompt";

export async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch("/api/prompts", { next: { revalidate: 30 } });
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

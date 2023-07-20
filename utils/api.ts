import { IPromptWithCreatorPopulated } from "@/types/prompt";

export async function fetchPrompts(): Promise<IPromptWithCreatorPopulated[]> {
  const response: Response = await fetch("http://localhost:3000/api/prompts", { next: { revalidate: 30 } });
  const prompts: IPromptWithCreatorPopulated[] = await response.json();
  return prompts;
};

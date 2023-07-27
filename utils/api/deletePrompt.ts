import { toast } from "react-toastify";

// This function will delete a specific prompt
export default async function deletePrompt(promptId: string): Promise<boolean> {
  const response: Response = await fetch(`/api/prompts/${promptId}`, { method: "DELETE" });

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return false;
  };

  // If response is successfull then show a prompt and return the new prompt
  toast.success("Prompt deleted");
  return true;
};

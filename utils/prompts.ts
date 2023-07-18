import { IPromptWithCreatorPopulated } from "@/types/prompt";

export function filterPromptsBySearchQuery(prompts: IPromptWithCreatorPopulated[], searchQuery: string) {
  const checkIsQueryInUserName = (prompt: IPromptWithCreatorPopulated): boolean => {
    return prompt
      .creator
      .name
      .replaceAll(" ", "")
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .includes(
        searchQuery
          .slice(1)
          .replaceAll(" ", "")
          .replace(/[^\w\s]/gi, "")
          .toLowerCase()
      );
  };

  const checkIsQueryInUserEmail = (prompt: IPromptWithCreatorPopulated): boolean => {
    return prompt
      .creator
      .email
      .split("@")[0]
      .includes(
        searchQuery
          .slice(1)
          .replaceAll(" ", "")
          .split("@")[0]
          .toLowerCase()
      );
  };

  const checkIsQueryInPromptTag = (prompt: IPromptWithCreatorPopulated): boolean => {
    return prompt.tag
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(
        searchQuery
          .replaceAll(" ", "")
          .toLowerCase()
      );
  };

  const checkIsQueryInPromptContent = (prompt: IPromptWithCreatorPopulated): boolean => {
    return prompt
      .prompt
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(
        searchQuery
          .slice(1)
          .replaceAll(" ", "")
          .toLowerCase()
      );
  };


  let filteredPrompts = prompts.filter((prompt): boolean => {
    // If query starts with `@` then search for prompt by query user
    if (searchQuery.startsWith("@")) return checkIsQueryInUserName(prompt) || checkIsQueryInUserEmail(prompt);

    // If query starts with `#` then search for prompt by tag
    if (searchQuery.startsWith("#")) return checkIsQueryInPromptTag(prompt);

    // Filter query and search for prompt by prompt
    return checkIsQueryInPromptContent(prompt);
  });

  return filteredPrompts;
}


"use client";

import { useEffect, useState } from "react";
import { fetchPrompts } from "@/utils/api";
import { filterPromptsBySearchQuery } from "@/utils/prompts";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import Prompts from "../Prompts";

type Props = {
  searchBarPlaceholder: string;
};

export default function FeedsSection({ searchBarPlaceholder }: Props) {
  // State variable to denote if prompts are being loaded
  const [loading, setLoading] = useState<boolean>(true);

  // State variable to store prompts that are to be displayed
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[]>([]);

  // State variable to store the query of the prompts search bar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State variable will store the prompts which are filtered according to search query
  let filteredPrompts: IPromptWithCreatorPopulated[] = filterPromptsBySearchQuery(prompts, searchQuery);

  // Fetch fresh prompts when a page is loaded
  useEffect(() => {
    const fetchPosts = async () => {
      // Set loading to true before starting fetching
      setLoading(true);

      // Fetch prompts and store it in state variable
      const fetchedPrompts = await fetchPrompts();
      setPrompts(fetchedPrompts);

      // Set loading to false after fetching
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <Prompts
      prompts={filteredPrompts}
      loading={loading}
      searchValue={searchQuery}
      setSearchValue={setSearchQuery}
      searchBarPlaceholder={searchBarPlaceholder}
    />
  );
}

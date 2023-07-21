"use client"

import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { filterPromptsBySearchQuery } from "@/utils/prompts";
import { fetchPrompts } from "@/utils/api";
import { useEffect, useState } from "react";
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
      setLoading(true);
      const data = await fetchPrompts();
      setPrompts(data);
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
  )
}

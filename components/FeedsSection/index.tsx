"use client"

import { useEffect, useState } from "react";
import Prompts from "../Prompts";
import { fetchPrompts } from "@/utils/api";
import { filterPromptsBySearchQuery } from "@/utils/prompts";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  initialPrompts: IPromptWithCreatorPopulated[] | [];
}

export default function FeedsSection({ initialPrompts }: Props) {
  // State variables to store prompts that are to be displayed
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[] | []>(initialPrompts);

  // State variable to store the query in the prompts search bar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State variable will store the prompts which are filtered according to search query
  let filteredPrompts: IPromptWithCreatorPopulated[] = filterPromptsBySearchQuery(prompts, searchQuery);

  // Fetch fresh prompts when a page is loaded
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchPrompts();
      setPrompts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Prompts
      prompts={filteredPrompts}
      searchValue={searchQuery}
      setSearchValue={setSearchQuery}
    />
  )
}

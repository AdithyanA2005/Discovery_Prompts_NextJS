"use client";

import { useEffect, useState } from "react";
import { fetchUserPrompts } from "@/utils/api";
import { filterPromptsBySearchQuery } from "@/utils/prompts";
import Prompts from "../Prompts";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  userId: string;
  searchBarPlaceholder: string;
};

export default function ProfileFeedsSection({ userId, searchBarPlaceholder }: Props) {
  // State variable to denote if prompts are being loaded
  const [loading, setLoading] = useState<boolean>(true);

  // State variable to store prompts that are to be displayed
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[]>([]);

  // State variable to store the query of the prompts search bar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State variable will store the prompts which are filtered according to search query
  let filteredPrompts: IPromptWithCreatorPopulated[] = filterPromptsBySearchQuery(
    prompts,
    searchQuery,
    true
  );

  // Fetch fresh prompts when a page is loaded
  useEffect(() => {
    const fetchPosts = async () => {
      // Set Loading to true before starting to fetch
      setLoading(true);

      // Fetch prompt of a specific user
      const fetchedPrompts = await fetchUserPrompts(userId);

      // Set prompt to fetched data and set loading to false
      setPrompts(fetchedPrompts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="text-4xl text-accent text-center font-semibold mb-12">Prompts</h1>

      <Prompts
        prompts={filteredPrompts}
        loading={loading}
        searchValue={searchQuery}
        setSearchValue={setSearchQuery}
        searchBarPlaceholder={searchBarPlaceholder}
      />
    </>
  );
}

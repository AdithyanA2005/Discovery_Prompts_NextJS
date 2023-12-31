"use client";

import { useEffect, useState } from "react";
import fetchUserPrompts from "@/utils/api/fetchUserPrompts";
import { filterPromptsBySearchQuery } from "@/utils/prompts";
import Prompts from "../Prompts";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { useSearchParams } from "next/navigation";
import ProfileHeading from "../ProfileHeading";

type Props = {
  userId: string;
  searchBarPlaceholder: string;
};

export default function ProfileFeedsSection({ userId, searchBarPlaceholder }: Props) {
  // Get profile users name
  const searchParams = useSearchParams();
  const userName: string | null = searchParams.get("name");

  // State variable to denote if prompts are being loaded
  const [loading, setLoading] = useState<boolean>(true);

  // State variable to store prompts that are to be displayed
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[]>([]);

  // State variable denoting whether more prompts are available to load
  const [morePromptsAvailable, setMorePromptsAvailable] = useState<boolean>(false);

  // State variable to store the query of the prompts search bar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State variables to store the prompts pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Function to load more prompts
  const loadMorePrompts = () => setPage(prev => prev + 1);

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

      // Fetch prompt of a specific user and store it in state variable
      const fetchedPrompts = await fetchUserPrompts(userId, page, pageSize);
      setPrompts(prev => [...prev, ...fetchedPrompts]);

      // Set if more prompts available 
      console.log(fetchedPrompts.length)
      if (fetchedPrompts.length < pageSize) setMorePromptsAvailable(false)
      else setMorePromptsAvailable(true)

      // Set loading to false after fetching
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <section>
      <ProfileHeading text1={userName} text2="Prompts" />

      <Prompts
        prompts={filteredPrompts}
        loading={loading}
        searchValue={searchQuery}
        setSearchValue={setSearchQuery}
        searchBarPlaceholder={searchBarPlaceholder}
        loadMorePrompts={loadMorePrompts}
        morePromptsAvailable={morePromptsAvailable}
      />
    </section>
  );
}

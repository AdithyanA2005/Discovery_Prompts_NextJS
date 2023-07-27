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
    <section>
      <ProfileHeading text1={userName} text2="Prompts" />

      <Prompts
        prompts={filteredPrompts}
        loading={loading}
        searchValue={searchQuery}
        setSearchValue={setSearchQuery}
        searchBarPlaceholder={searchBarPlaceholder}
      />
    </section>
  );
}

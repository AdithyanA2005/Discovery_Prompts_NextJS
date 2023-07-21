"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Prompts from "../Prompts";
import { fetchUserPrompts } from "@/utils/api";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { filterPromptsBySearchQuery } from "@/utils/prompts";

type Props = {
  searchBarPlaceholder: string;
};

export default function ProfileFeedsSection({ searchBarPlaceholder }: Props) {
  // Define session which store auth
  const { data: session } = useSession();

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
      console.log(session?.user.id);
      // Fetch prompt of a specific user
      // NOTE: Session.user.id will be there because it is checked in the layout file
      const data = await fetchUserPrompts(session?.user.id || "");

      // Set prompt to fetched data and set loading to false
      setPrompts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="text-4xl text-accent text-center font-semibold mb-12">Your Prompts</h1>

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

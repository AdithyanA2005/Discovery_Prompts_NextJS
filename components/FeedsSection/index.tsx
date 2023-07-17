"use client"

import { useEffect, useState } from "react";
import PromptCardList from "../PromptCardList";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import Loader from "../Loader";

type Props = {}

export default function FeedsSection({ }: Props) {
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let filteredPrompts: IPromptWithCreatorPopulated[] = prompts;

  const handleInputsBtnClick = () => {
    if (searchQuery) setSearchQuery("");
  }

  // Fetch prompts when page is loaded
  useEffect(() => {
    const fetchPosts = async () => {
      const response: Response = await fetch("/api/prompt", { next: { revalidate: 60 } });
      const data: IPromptWithCreatorPopulated[] = await response.json();
      setPrompts(data);
    };;

    fetchPosts();
  }, []);

  // Filter prompts according to searchQuery
  filteredPrompts = prompts.filter((prompt: IPromptWithCreatorPopulated): boolean => {
    // If query starts with `@` then search for prompt by query user
    if (searchQuery.startsWith("@")) {
      // Look for query in user name
      const inName = prompt
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

      // Look for query in user email
      const inEmail = prompt
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

      return inName || inEmail;
    };

    // If query starts with `#` then search for prompt by tag
    if (searchQuery.startsWith("#")) {
      console.log(`Tag ${prompt.tag} | Query ${searchQuery} | Include ${prompt.tag.includes(searchQuery)}`)
      return prompt.tag
        .replaceAll(" ", "")
        .toLowerCase()
        .includes(
          searchQuery
            .replaceAll(" ", "")
            .toLowerCase()
        );
    };

    // Filter query and search for prompt by prompt
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
  });

  return (
    <section className="mt-16 w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="relative w-full flex items-center max-w-lg">
        <input
          type="text"
          placeholder="Search Prompts or #tag or @user"
          className="input input-bordered input-accent w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="hover:text-accent hover:scale-105 duration-300 animate-all absolute right-2 h-5 w-5 grid place-items-center" onClick={handleInputsBtnClick}>
          {searchQuery ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Prompt Card List */}
      {prompts.length === 0 
        ? <Loader />
        : <PromptCardList setSearch={setSearchQuery} prompts={filteredPrompts} />
      }
    </section>
  )
}

"use client"

import { ChangeEvent, useEffect, useState } from "react";
import PromptCardList from "../PromptCardList";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {}

export default function FeedsSection({ }: Props) {
  const [prompts, setPrompts] = useState<IPromptWithCreatorPopulated[] | []>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  // Fetch prompts when page is loaded
  useEffect(() => {
    const fetchPosts = async () => {
      const response: Response = await fetch("/api/prompt");
      const data: IPromptWithCreatorPopulated[] = await response.json();
      setPrompts(data);
    };;

    fetchPosts();
  }, []);

  return (
    <section className="mt-16 w-full flex flex-col items-center">
      {/* Search Bar */}
      <form className="relative w-full flex items-center max-w-lg">
        <input
          type="text"
          placeholder="Search Prompts"
          className="input input-bordered input-accent w-full"
          value={searchText}
          onChange={handleSearchChange}
          required={true}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </form>

      {/* Prompt Card List */}
      <PromptCardList prompts={prompts} />
    </section>
  )
}

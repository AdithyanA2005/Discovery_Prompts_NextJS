"use client"

import { ChangeEvent } from "react";
import Loader from "../Loader";
import PromptCard from "./PromptCard";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  prompts: IPromptWithCreatorPopulated[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Prompts({ prompts, searchValue, setSearchValue }: Props) {
  const handleClearSearchValue = () => setSearchValue("")
  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <section className="w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="relative w-full flex items-center max-w-lg">
        <input
          type="text"
          placeholder="Search Prompts or #tag or @user"
          className="input input-bordered input-accent w-full"
          value={searchValue}
          onChange={handleSearchValueChange}
        />

        {/* Clear search button */}
        <button onClick={handleClearSearchValue} className="hover:text-accent hover:scale-105 duration-300 animate-all absolute right-2 h-5 w-5 grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Prompt Card List */}
      {prompts.length === 0 ? (
        <Loader />
      ) : (
        <div className="mt-12 max-w-7xl w-full space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
          {prompts.map((prompt) =>
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              setSearchValue={setSearchValue}
            />
          )}
        </div>
      )}
    </section>
  )
}

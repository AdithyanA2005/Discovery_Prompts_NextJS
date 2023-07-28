"use client";

import { ChangeEvent } from "react";
import PromptCard from "./PromptCard";
import SectionLoader from "../Loader/SectionLoader";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  loading: boolean;
  prompts: IPromptWithCreatorPopulated[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchBarPlaceholder: string;
  loadMorePrompts: () => void;
};

export default function Prompts({ prompts, loading, searchValue, setSearchValue, searchBarPlaceholder, loadMorePrompts }: Props) {
  const clearSearchValue = () => setSearchValue("");
  const searchValueOnChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  return (
    <section className="w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="relative w-full flex items-center max-w-lg">
        {/* Search bar input */}
        <input
          type="text"
          placeholder={searchBarPlaceholder}
          className="input input-bordered input-accent w-full"
          value={searchValue}
          onChange={searchValueOnChange}
        />

        {/* Clear-Search button */}
        <button
          onClick={clearSearchValue}
          className="hover:text-accent hover:scale-105 duration-300 animate-all absolute right-2 h-5 w-5 grid place-items-center"
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Prompt Cards List If prompts.length > 0*/}
      {prompts.length ? (
        <div className="mt-12 w-full space-y-5 py-8 sm:columns-2 xl:columns-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} setSearchValue={setSearchValue} />
          ))}
        </div>
      ) : null}

      {/* If not loading and prompt is not found then show no prompts found */}
      {!loading && !prompts.length && (<span className="mt-14 text-accent">No Prompts Found</span>)}

      {/* When prompts are being loaded */}
      {loading && <SectionLoader />}

      {/* Button to load more prompts */}
      {!loading && (
        <button onClick={loadMorePrompts} className="btn btn-outline btn-accent">
          Load More Prompts
        </button>
      )}
    </section>
  );
}

"use client"

import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreatorDetails from "./CreatorDetails";
import CopyBtn from "./CopyBtn";

type Props = {
  prompt: IPromptWithCreatorPopulated;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function PromptCard({ prompt, setSearch }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPrompt = () => {
    setCopied(true);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileClick = () => {
    if (prompt.creator._id === session?.user.id) router.push("/profile");
    else router.push(`/profile/${prompt.creator?._id}?name=${prompt.creator.name}`);
  };

  const handleTagClick = () => {
    setSearch(prompt.tag);
  };

  const handleEditClick = () => {

  };

  const handleDeleteClick = () => {

  };

  return (
    <div className="relative group break-inside-avoid bg-clip-padding backdrop-blur-lg backdrop-filter bg-primary bg-opacity-5 flex-1 p-6 pb-4 border rounded-lg border-primary">
      <CreatorDetails
        name={prompt.creator.name}
        email={prompt.creator.email}
        imgSrc={prompt.creator.image}
        handleProfileClick={handleProfileClick}
      />

      <CopyBtn
        copiedStatus={copied}
        handleOnClick={handleCopyPrompt}
      />

      {/* The Prompt */}
      <h2 onClick={handleCopyPrompt} className="my-4 cursor-pointer text-white">
        {prompt.prompt}
      </h2>

      {/* The Tags */}
      <p onClick={handleTagClick} className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-sm cursor-pointer">
        {prompt.tag}
      </p>

      {/* Profile Page Only */}
      {session?.user.id === prompt.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex gap-5 justify-end border-t border-primary pt-3">
          {/* Edit Btn */}
          <div className="tooltip" data-tip="Edit">
            <button onClick={handleEditClick} className="text-gray-300 hover:text-primary text-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
          </div>

          {/* Delete Btn */}
          <div className="tooltip" data-tip="Delete">
            <button onClick={handleDeleteClick} className="text-gray-300 hover:text-accent   text-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
"use client";

import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreatorActions from "./CreatorActions";
import CreatorDetails from "./CreatorDetails";
import CopyBtn from "./CopyBtn";
import Prompt from "./Prompt";
import Tag from "./Tag";

type Props = {
  prompt: IPromptWithCreatorPopulated;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function PromptCard({ prompt, setSearchValue }: Props) {
  // Define the current route path
  const pathName = usePathname();

  // Define session which store auth
  const { data: session } = useSession();

  // State will store if the prompt is copied
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Copy the content of the prompt & set copied state to true for 2 seconds
  const copyPromptContent = () => {
    setCopiedStatus(true);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  // Redirect user to appropriate profile page
  const redirectToProfiePage = () => {
    // If user himself is the creator
    if (prompt.creator._id === session?.user.id) redirect("/profile");

    // If the cretor is not the user himself
    redirect(`/profile/${prompt.creator?._id}?name=${prompt.creator.name}`);
  };

  // Set search value to the tag when a tag is clicked
  const searchForCurrentTag = () => {
    setSearchValue(prompt.tag);
  };

  return (
    <div className="relative group break-inside-avoid bg-clip-padding backdrop-blur-lg backdrop-filter bg-primary bg-opacity-5 flex-1 p-6 pb-4 border rounded-lg border-primary">
      {/* This will show the name, email and profile photo of the person who created the code */}
      <CreatorDetails
        name={prompt.creator.name}
        email={prompt.creator.email}
        imgSrc={prompt.creator.image}
        handleOnClick={redirectToProfiePage}
      />

      {/* When clicked this btn the content of the prompt will be copied to clipboard  */}
      <CopyBtn copiedStatus={copiedStatus} handleOnClick={copyPromptContent} />

      {/* This will show the main prompt and by clicking it you can copy its content to clipboard */}
      <Prompt text={prompt.prompt} handleOnClick={copyPromptContent} />

      {/* This will show the tag of the current prompt and when clicked on it it wil search for prompts with the same tag */}
      <Tag text={prompt.tag} handleOnClick={searchForCurrentTag} />

      {/* TODO: Implement `Edit` & `Delete` functionalitites */}
      {/* Profile Page Only Edit and Delete Btns*/}
      {session?.user.id === prompt.creator?._id && pathName === "/profile" && (
        <CreatorActions handleDeleteOnClick={() => {}} handleEditOnClick={() => {}} />
      )}
    </div>
  );
}

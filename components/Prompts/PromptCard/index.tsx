"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Tag from "./Tag";
import Prompt from "./Prompt";
import CopyBtn from "./CopyBtn";
import CreatorActions from "./CreatorActions";
import CreatorDetails from "./CreatorDetails";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  prompt: IPromptWithCreatorPopulated;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function PromptCard({ prompt, setSearchValue }: Props) {
  // Define router to navigate within pages
  const router = useRouter();

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
    router.push(`/profile/${prompt.creator?._id}?name=${prompt.creator.name}`);
  };

  // Set search value to the tag when a tag is clicked
  const searchForCurrentTag = () => {
    setSearchValue(prompt.tag);
  };

  // This function will redirect us to the prompts update page
  const redirectToEditPage = () => {
    router.push(`/update-prompt/${prompt._id}`);
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

      <div className="flex justify-between">
        {/* This will show the tag of the current prompt and when clicked on it it wil search for prompts with the same tag */}
        <Tag text={prompt.tag} handleOnClick={searchForCurrentTag} />

        {/* TODO: Implement `Edit` & `Delete` functionalitites */}
        {/* Profile Page Only Edit and Delete Btns*/}
        {session?.user.id === prompt.creator?._id && pathName.includes("/profile") && (
          <CreatorActions handleDeleteOnClick={() => {}} handleEditOnClick={redirectToEditPage} />
        )}
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PromptFormSection from "@/components/PromptFormSection";
import createNewPrompt from "@/utils/api/createNewPrompt";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

export default function NewPromptPage({ }: {}) {
  // Define router to navigate within pages
  const router = useRouter();

  // Define session which store auth
  const { data: session } = useSession();

  // State varible denoting whether the form is being submitted
  const [submitting, setSubmitting] = useState<boolean>(false);

  // State variable storing the promt and tag
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  // Handle form reset
  const handleReset = () => {
    setPrompt("");
    setTag("");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    // Prevent the default form actions
    e.preventDefault();

    // Set submitting/loading to true before starting fetching
    setSubmitting(true);

    // Creat the new prompt and return to homepage
    const promptPost: IPromptWithCreatorPopulated | null = await createNewPrompt(
      session?.user.id || "", 
      prompt, 
      tag
    );
    if (promptPost) router.push("/");

    // Set submitting/loading to false after fetching
    setSubmitting(false);
  };

  return (
    <PromptFormSection
      type="create"
      prompt={prompt}
      setPrompt={setPrompt}
      tag={tag}
      setTag={setTag}
      loading={submitting}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
    />
  );
}

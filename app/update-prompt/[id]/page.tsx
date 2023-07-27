"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PromptFormSection from "@/components/PromptFormSection";
import fetchPrompt from "@/utils/api/fetchPrompt";
import updatePrompt from "@/utils/api/updatePrompt";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

export default function UpdatePromptPage({ params }: { params: { id: string } }) {
  // Router to navigate within pages
  const router = useRouter();

  // Get session which store auth
  const { data: session } = useSession();

  // State varible denoting whether the form is being submitted
  const [submitting, setIsSubmitting] = useState(false);

  // TODO: implement loading until initial values are loaded

  // State variable storing the new promt and tag
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  // State variables to store the initial values of the prompt and tag to be changed
  const [initialTag, setInitialTag] = useState<string>("");
  const [initialPrompt, setInitialPrompt] = useState<string>("");


  // On Intial load fetch the current data of the prompt and set it to state
  useEffect(() => {
    const getPromptDetails = async () => {
      const fetchedPrompt: IPromptWithCreatorPopulated | null = await fetchPrompt(params.id);

      // Set initial or the previous value of the prompt and tag
      setInitialPrompt(fetchedPrompt?.prompt || "")
      setInitialTag(fetchedPrompt?.tag || "");

      // State variable connected to input tag
      setPrompt(fetchedPrompt?.prompt || "");
      setTag(fetchedPrompt?.tag || "");
    };

    getPromptDetails();
  }, []);


  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    // Prevent default form submission actions
    e.preventDefault();

    // Set loading to true before starting
    setIsSubmitting(true);

    // Update the prompt with new promt text and tag
    const updatedPrompt: IPromptWithCreatorPopulated | null = await updatePrompt(params.id, session?.user.id || "", prompt, tag);
    
    // Redirect to "/" route
    if (updatedPrompt) router.back();

    // Finally set submitting/loading to false
    setIsSubmitting(false);
  };

  // Handle form reset
  const handleReset = () => {
    setPrompt(initialPrompt);
    setTag(initialTag);
  };

  return (
    <PromptFormSection
      type="Update"
      tag={tag}
      prompt={prompt}
      setTag={setTag}
      setPrompt={setPrompt}
      submitting={submitting}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
    />
  );
};


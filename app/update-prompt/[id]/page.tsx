"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PromptFormSection from "@/components/PromptFormSection";
import fetchPrompt from "@/utils/api/fetchPrompt";
import updatePrompt from "@/utils/api/updatePrompt";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { toast } from "react-toastify";

export default function UpdatePromptPage({ params }: { params: { id: string } }) {
  // Router to navigate within pages
  const router = useRouter();

  // Get session which store auth
  const { data: session } = useSession();

  // State varible denoting whether the form is being submitted
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  // State variable denoting whether the data is being loaded
  const [loading, setLoading] = useState<boolean>(true)

  // State variable storing the new promt and tag
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  // State variables to store the initial values of the prompt and tag to be changed
  const [initialTag, setInitialTag] = useState<string>("");
  const [initialPrompt, setInitialPrompt] = useState<string>("");


  // On Intial load fetch the current data of the prompt and set it to state
  useEffect(() => {
    const getPromptDetails = async () => {
      // Set loading to true before fetching prompt data
      setLoading(true)

      // Const fetch prompt
      const fetchedPrompt: IPromptWithCreatorPopulated | null = await fetchPrompt(params.id);

      // Set initial or the previous value of the prompt and tag
      setInitialPrompt(fetchedPrompt?.prompt || "")
      setInitialTag(fetchedPrompt?.tag || "");

      // State variable connected to input tag
      setPrompt(fetchedPrompt?.prompt || "");
      setTag(fetchedPrompt?.tag || "");

      // Redirect to homepage if prompt creator is not the logged in user
      if (fetchedPrompt?.creator._id !== session?.user.id) {
        toast.error("You are not the creator of this prompt");
        router.push("/");
      };

      // Set loading to false after fetching prompt data
      setLoading(false)
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
      type="update"
      tag={tag}
      prompt={prompt}
      setTag={setTag}
      setPrompt={setPrompt}
      loading={loading || submitting}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
    />
  );
};


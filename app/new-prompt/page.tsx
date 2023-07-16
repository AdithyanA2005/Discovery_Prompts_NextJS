"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PromptFormSection from "@/components/PromptFormSection";
import { ICreatePromptRequestBody } from "@/types/prompt";

export default function NewPromptPage({ }: {}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [tag, setTag] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Handle form reset
  const handleReset = () => {
    setPrompt("");
    setTag("");
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Before starting set submitting (loading) to true 
    setSubmitting(true);

    try {
      // Call the api
      const reqBody: ICreatePromptRequestBody = { userId: session?.user.id || "", prompt, tag };
      const reqConfig: RequestInit = { method: "POST", body: JSON.stringify(reqBody) };
      const response: Response = await fetch("/api/prompt/new", reqConfig);

      // Return to homepage if request is successfull
      if (response.ok) router.push("/");
    } catch (error) {
      // Log any errors if it occured
      console.log(error);
    } finally {
      // Finally set submitting to false after executing all it
      setSubmitting(false);
    }
  };

  return (
    <PromptFormSection
      type="Create"
      prompt={prompt}
      setPrompt={setPrompt}
      tag={tag}
      setTag={setTag}
      submitting={submitting}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
    />
  )
}
import FeedsSection from "@/components/FeedsSection";
import HeroSection from "@/components/HeroSection";
import { IPromptWithCreatorPopulated } from "@/types/prompt";
import { fetchPrompts } from "@/utils/api";

export default async function Page() {
  const initialPrompts: IPromptWithCreatorPopulated[] = await fetchPrompts();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        heading="Discover & Share"
        headingSpecial="AI-Powered Prompts"
        description="Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts"
      />

      {/* Prompt Feeds Section */}
      <FeedsSection
        initialPrompts={initialPrompts}
      />
    </>
  )
}

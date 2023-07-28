import HeroSection from "@/components/HeroSection";
import FeedsSection from "@/components/FeedsSection";

export default async function RootPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        heading="Discover & Share"
        headingSpecial="AI-Powered Prompts"
        description="Discovery Prompts is an open-source AI prompting tool for modern world to discover, create and share creative prompts"
      />

      {/* Prompt Feeds Section */}
      <FeedsSection
        searchBarPlaceholder="Search Prompts or #tag or @user"
      />
    </>
  );
}

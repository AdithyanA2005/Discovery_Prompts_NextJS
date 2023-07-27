import ProfileFeedsSection from "@/components/ProfileFeedsSection";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <ProfileFeedsSection
      userId={params.id}
      searchBarPlaceholder="Search Prompts or #tag"
    />
  );
}

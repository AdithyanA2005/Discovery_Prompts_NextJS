import PromptCard from "./PromptCard";
import { IPromptWithCreatorPopulated } from "@/types/prompt";

type Props = {
  prompts: IPromptWithCreatorPopulated[]
}

export default function PromptCardList({ prompts }: Props) {
  return (
    <div className="mt-12 max-w-7xl w-full space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {prompts.map((prompt) => <PromptCard key={prompt._id} prompt={prompt} />)}
    </div>
  )
}
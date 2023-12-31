import { ChangeEvent, FormEvent } from "react";
import { ETag } from "@/types/tag";
import FormLabel from "./FormLabel";
import LoaderDots from "../Loader/LoaderDots";

type Props = {
  type: "create" | "update";
  prompt: string,
  tag: string;
  loading: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: (e: FormEvent) => void;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export default function PromptFormSection({ type, tag, setTag, prompt, setPrompt, loading, handleReset, handleSubmit }: Props) {
  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value);
  const handleTagChange = (e: ChangeEvent<HTMLSelectElement>) => setTag(e.target.value);
  const tagOptions = Object.values(ETag);

  return (
    <section className="px-1.5 my-[3vh] sm:my-[5vh] w-full max-w-4xl mx-auto">
      <h1 className="text-primary mb-6 font-bold text-2xl capitalize sm:text-3xl">
        {type} Your Prompt
      </h1>

      <form onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col gap-4">
        {/* Prompt Input */}
        <div>
          <FormLabel htmlFor="prompt" text="Prompts"/>

          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            disabled={loading}
            onChange={handlePromptChange}
            required={true}
            className="textarea font-semibold textarea-primary w-full placeholder:text-gray-200 text-gray-200 bg-gray-900"
            placeholder={type === "create" ? "Write your post here" : "Loading prompt"}
          />
        </div>

        {/* Tag Input */}
        <div>
          <FormLabel htmlFor="tag" text="Tag"/>

          <select
            id="tag"
            value={tag}
            disabled={loading}
            placeholder={type === "create" ? "#Tag" : "Loading #Tag"}
            required={true}
            onChange={handleTagChange}
            className="text-gray-200 select select-primary w-full bg-gray-900"
          >
            <option className="text-gray-300" value="">
              Pick your #tag
            </option>

            {tagOptions.map((option) => (
              <option className="p-4 border border-accent" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4">
          {/* Submit button */}
          <button type="submit" disabled={loading} className="btn btn-primary btn-outline font-semibold">
            {prompt && tag && loading ? `${type.slice(0, -1)}ing Prompt` : `${type} Prompt`}
            {prompt && tag && loading && <LoaderDots />}
          </button>

          {/* Reset button */}
          <button type="reset" disabled={loading} className="btn text-primary btn-ghost btn-primary">
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

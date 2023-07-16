import { ChangeEvent, FormEvent } from "react";

type Props = {
  type: string;
  prompt: string,
  tag: string;
  submitting: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

export default function PromptFormSection({ type, tag, setTag, prompt, setPrompt, submitting, handleReset, handleSubmit }: Props) {
  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value);
  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => setTag(() => {
    if (e.target.value[0] !== "#") return `#${e.target.value}`;
    return e.target.value;
  });

  return (
    <section className="px-1.5 my-[3vh] sm:my-[5vh] w-full max-w-3xl text-white">
      <h1 className="text-primary mb-6 font-bold text-2xl capitalize sm:text-3xl">
        {type} Your Prompt
      </h1>

      <form onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col gap-4">
        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block ml-2 mb-2">Prompt</label>
          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            onChange={handlePromptChange}
            required={true}
            className="textarea textarea-primary w-full bg-gray-900"
            placeholder="Write your post here"
          />
        </div>

        {/* Tags Input */}
        <div>
          <label htmlFor="tag" className="block ml-2 mb-2">Tag</label>
          <input
            id="tag"
            type="text"
            className="input input-bordered input-primary w-full bg-gray-900"
            value={tag}
            placeholder='#Tag'
            required={true}
            onChange={handleTagChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4">
          {/* Submit button */}
          <button type="submit" disabled={submitting} className="btn btn-primary btn-outline font-semibold">
            {submitting ? "Creating Prompt ..." : "Create Prompt"}
          </button>

          {/* Reset button */}
          <button type="reset" className="btn text-accent btn-ghost btn-primary">
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
type Props = {
  text: string;
  handleOnClick: () => void;
};

export default function Prompt({ text, handleOnClick }: Props) {
  return (
    <h2 onClick={handleOnClick} className="my-4 cursor-pointer text-white">
      {text}
    </h2>
  );
}

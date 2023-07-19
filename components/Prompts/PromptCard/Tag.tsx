type Props = {
  text: string;
  handleOnClick: () => void;
};

export default function Tag({ text, handleOnClick }: Props) {
  return (
    <button
      onClick={handleOnClick}
      className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-sm cursor-pointer"
    >
      {text}
    </button>
  );
}

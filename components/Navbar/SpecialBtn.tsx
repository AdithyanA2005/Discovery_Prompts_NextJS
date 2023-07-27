import LoaderDots from "../Loader/LoaderDots";

type Props = {
  text: string;
  disabled?:boolean; 
  loading?: boolean;
  onClick: () => void;
};

export default function SpecialBtn({ text, onClick, disabled, loading }: Props) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn btn-outline btn-accent btn-sm py-3 h-auto text-xs mr-2"
      >
        {text}
        {loading && <LoaderDots />}
      </button>
    </div>
  );
}

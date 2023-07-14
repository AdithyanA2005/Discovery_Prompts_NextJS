type Props = {
  text: string;
  onClickHandle: () => void;
}

export default function SpecialBtn({ text, onClickHandle }: Props) {
  return (
    <button
      onClick={onClickHandle}
      className="btn btn-outline btn-accent btn-sm py-3 h-auto text-xs mr-2"
    >
      {text}
    </button>
  )
}

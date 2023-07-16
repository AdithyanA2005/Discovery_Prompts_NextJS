type Props = {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

export default function SpecialBtn({ text, onClick, disabled }: Props) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn btn-outline btn-accent btn-sm py-3 h-auto text-xs mr-2"
      >
        {text}
      </button>
    </div>
  )
}

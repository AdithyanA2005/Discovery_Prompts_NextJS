type Props = {
  text: string;
}

export default function SpecialBtn({ text }: Props) {
  return (
    <button className="btn btn-outline btn-accent btn-sm py-3 h-auto text-xs mr-2">
      {text}
    </button>
  )
}

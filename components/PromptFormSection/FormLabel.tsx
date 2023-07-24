type Props = {
  htmlFor: string;
  text: string;
};

export default function FormLabel({ htmlFor, text }: Props) {
  return (
    <label htmlFor={htmlFor} className="font-bold text-white block ml-2 mb-2">
      {text}
    </label>
  );
}

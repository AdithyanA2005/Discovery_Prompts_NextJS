type Props = {
  text1: string | null;
  text2: string | null;
};

export default function ProfileHeading({ text1, text2 }: Props) {
  return (
    <h1 className="text-4xl text-accent text-center font-semibold mb-12">
      {text1}

      <span className="text-primary">
        {text1 && " - "}
        {text2}
      </span>
    </h1>
  );
}

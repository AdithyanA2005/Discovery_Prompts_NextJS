type Props = {};

export default function SectionLoader({ }: Props) {
  return (
    <div className="flex justify-center mt-16">
      <span className="bg-primary loading loading-bars loading-lg mx-auto" />
    </div>
  );
}

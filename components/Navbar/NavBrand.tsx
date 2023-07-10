import Link from "next/link";

type Props = {
  title: string;
}

export default function NavBrand({ title }: Props) {
  return (
    <div className="flex-1">
      <Link href="/" className="font-bold text-xl">{title}</Link>
    </div>
  )
}

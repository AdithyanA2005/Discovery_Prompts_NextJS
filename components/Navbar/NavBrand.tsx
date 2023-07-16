import Link from 'next/link'

type Props = {}

export default function NavBrand({ }: Props) {
  return (
    <Link href="/" className="btn btn-ghost hover:border btn-accent hover:text-accent outline-none font-bold">
      <span className="text-lg sm:text-lg hidden sm:block">Discovery Prompts</span>
      <span className="text-2xl sm:hidden font-serif">DP</span>
    </Link>
  )
}
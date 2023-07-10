import Link from "next/link";

type Props = {}

export default function AccountMenu({ }: Props) {
  const hasAvatar = false;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className={`btn btn-ghost btn-circle avatar ${!hasAvatar && "placeholder"}`}>
        <div className={`w-full rounded-full ${!hasAvatar && "bg-neutral-focus text-neutral-content"}`}>
          {hasAvatar
            ? <img src="/path/to/image" />
            : <span className="text-xs">AA</span>
          }
        </div>

      </label>

      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href="/profile">Profile</Link></li>
        <li><Link href="/logout">Logout</Link></li>
      </ul>
    </div>
  )
}

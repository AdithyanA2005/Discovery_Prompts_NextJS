import { signOut } from "next-auth/react";
import Image from "next/image"

type Props = {
  userName: string | undefined;
  userImage: string | undefined;
}

export default function AccountActionsDropdown({ userName, userImage}: Props) {
  // This function will retunn the intials for a given name 
  const getInitials = (name: string): string => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials || "😊";
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Btn */}
      <button className={`btn btn-circle avatar flex ${!userImage && "placeholder"}`}>
        <div className={`w-full rounded-full ${!userImage && "bg-neutral-focus text-accent"}`}>
          {userImage
            ? <Image
              src={userImage}
              width={45}
              height={45}
              alt="Profile"
              className="object-contain"
            />
            : <span className="block text-xs">{getInitials(userName || "")}</span>
          }
        </div>
      </button>

      {/* Dropdown Menu */}
      <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
        <li>
          <button onClick={() => signOut()} className="hover:text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
import Link from "next/link";

export default function Navbar() {
  const isLoggedIn = false;
  const hasAvatar = false;

  return (
    <nav className="navbar pt-3 bg-base-100">
      {/* NAVBRAND */}
      <Link href="/" className="flex-1 font-bold text-white">
        <span className="text-lg sm:text-xl hidden sm:block">Discovery Prompts</span>
        <span className="text-2xl sm:hidden font-serif">DP</span>
      </Link>

      <div className="flex-none">
        {isLoggedIn ? (
          <div className="flex items-center">
            {/* WRITE NEW PROMPT BTN */}
            <button className="btn btn-outline btn-accent btn-sm py-3 h-auto text-xs mr-2">Write New Prompt</button>

            {/* ACCOUNT ACTIONS */}
            <div className="dropdown dropdown-end">
              {/* Avatar Btn */}
              <button className={`btn btn-circle avatar flex ${!hasAvatar && "placeholder"}`}>
                <div className={`w-full rounded-full ${!hasAvatar && "bg-neutral-focus text-accent"}`}>
                  {hasAvatar 
                    ? <img src="/path/to/image" />
                    : <span className="block text-xs">AA</span>
                  }
                </div>
              </button>

              {/* Dropdown Menu */}
              <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                <li>
                  <Link href="" className="hover:text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>

          </div>
        )}
      </div>
    </nav >
  )
}

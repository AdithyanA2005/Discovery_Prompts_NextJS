import NavBrand from "./NavBrand";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const isLoggedIn = true;

  return (
    <nav className="navbar px-3 bg-base-100">
      <NavBrand title="Discovery Prompts" />

      <div className="flex-none">
        {isLoggedIn ? (
          <>
            <button className="btn btn-ghost btn-circle mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-primary w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <AccountMenu />
          </>
        ) : (
          <>

          </>
        )}
      </div>
    </nav >
  )
}

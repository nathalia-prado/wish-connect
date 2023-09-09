import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from '../auth.tsx'

import Logo from '../icons/logo.tsx'

const links = [
  { name: 'Home', to: '/' },
  { name: 'Wishlists', to: '/wishlists' },
  { name: 'New Wishlist', to: '/add' },
]

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogout = () => {
    logout()
  }

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: { screen_hint: 'signup', prompt: 'login' },
    })
  }

  return (
    <>
      <div className="relative bg-violet-200">
        <div className="mx-auto max-w-7x1 px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Wish Connect</span>
                <Logo />
              </Link>
            </div>

            <div className=" md:flex lg:space-x-2">
              <IfAuthenticated>
                <ul className="flex p-2 justify-between items-center w-full">
                  {links.map((link) => {
                    return (
                      <li key={link.to}>
                        <DesktopLink to={link.to}>{link.name}</DesktopLink>
                      </li>
                    )
                  })}
                </ul>
              </IfAuthenticated>
            </div>

            <div className="items-center justify-end flex space-x sm:flex-1 md:flex-1 md:space-x-4 lg:w-0 join">
              <IfNotAuthenticated>
                <button
                  className="justify-between text-l no-underline text-slate-700 hover:italic join-item"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
                <button
                  className="justify-between text-l no-underline text-slate-700 hover:italic join-item"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </IfNotAuthenticated>
              <IfAuthenticated>
                <button
                  className="justify-between text-l no-underline text-slate-700 hover:italic"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </IfAuthenticated>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function DesktopLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="rounded-md px-4 py-4 text-base font-semibold text-slate-700 mix-blend-luminosity hover:bg-slate-800/10 hover:rounded-full
      hover:text-slate-800 lg:text-lg"
    >
      {children}
    </Link>
  )
}

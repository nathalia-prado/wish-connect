import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from '../auth.tsx'

import Logo from '../icons/logo.tsx'

export default function Nav() {
  const { logout, loginWithRedirect, user, getAccessTokenSilently } = useAuth0()

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

  const handleRevealSecret = async () => {
    const token = await getAccessTokenSilently()
    console.log(token)
  }

  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/">
          <span>Wish Connect</span>
          {/* logo goes here */}
          <Logo />
        </Link>
      </div>

      <div className="nav-link">
        <IfAuthenticated>
          <Link to={'/wishlists'}>Wishlists</Link>
          <Link to={'/add'}>New Wishlist</Link>
          <Link to={'/calculator'}>Calculator</Link>
        </IfAuthenticated>
      </div>

      <div className="login-container">
        <IfNotAuthenticated>
          <button className="login" onClick={handleLogin}>
            Sign in
          </button>
          <button className="login" onClick={handleSignUp}>
            Sign up
          </button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <button className="login" onClick={handleLogout}>
            Log off
          </button>
          <button className="login" onClick={handleRevealSecret}>
            Gimme Your Secrets!
          </button>
        </IfAuthenticated>
      </div>
    </div>
  )
}

export function DesktopLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return <Link to={to}>{children}</Link>
}

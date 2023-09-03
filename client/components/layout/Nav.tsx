import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { IfAuthenticated, IfNotAuthenticated } from '../auth'

const links = [
  { name: 'Home', to: '/' },
  { name: 'My Wishlists', to: '/wishlists' },
  { name: 'New Wishlist', to: '/wishlists/add' },
  { name: 'Calculator', to: '/calculator' },
]

export default function Nav() {
  const { logout, loginWithRedirect } = useAuth0()

  const handleLogout = () => {
    logout()
  }

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: { screen_hint: 'signup', prompt: 'login' },
    })
  }

  return (
    <div className="div">
      <Link to="/">
        <span>Wish Connect</span>
      </Link>
    </div>
  )
}

import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/layout/app-layout.tsx'
import Home from './pages/home.tsx'
import NotFound from './pages/404.tsx'
import AllWishlists from './pages/all-wishlists.tsx'
import WishlistEdit from './pages/wishlist-edit.tsx'
import NewWishlist from './pages/new-wishlist.tsx'
import Wishlist from './pages/wishlist.tsx'
import User from './pages/user.tsx'
import UserWishlist from './pages/user-wishlist.tsx'
import Calculator from './pages/calculator.tsx'
import FriendWishlists from './pages/friend-wishlists.tsx'
import FriendsSingleWishlist from './pages/friend-single-wishlist.tsx'

export const routes = createRoutesFromElements(
  <>
    <Route element={<App />}>
      <Route index element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/wishlists" element={<AllWishlists />} />
      <Route path="/friends/:friendId" element={<FriendWishlists />} />
      <Route
        path="/friends/:friendId/:wishlistId"
        element={<FriendsSingleWishlist />}
      />
      <Route path="/add" element={<NewWishlist />} />
      <Route path="/wishlists/:id" element={<Wishlist />} />
      <Route path="/wishlists/:id/edit" element={<WishlistEdit />} />
      <Route path="/:username" element={<User />} />
      <Route path="/:username/:wishlistId" element={<UserWishlist />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </>
)

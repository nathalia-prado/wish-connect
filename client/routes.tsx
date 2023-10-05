import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/layout/app-layout.tsx'
import Home from './pages/home.tsx'
import NotFound from './pages/404.tsx'
import AllWishlists from './pages/all-wishlists.tsx'
// import WishlistEdit from './pages/wishlist-edit.tsx'
import Wishlist from './pages/wishlist.tsx'
// import Calculator from './pages/calculator.tsx'
import Users from './pages/users.tsx'
import FriendWishlists from './pages/friend-wishlists.tsx'
import { EditWishlistForm } from './components/EditWishlistForm.tsx'
import FriendsSingleWishlist from './pages/friend-single-wishlist.tsx'
import WishlistForm from './components/AddWishlist.tsx'
import AddItemForm from './pages/wishlist-item-form.tsx'

export const routes = createRoutesFromElements(
  <>
    <Route element={<App />}>
      <Route index element={<Home />} />
      {/* <Route
        path="/calculator"
        element={
          <Calculator
            items={[]}
            handleDelete={function (index: number): void {
              throw new Error('Function not implemented.')
            }}
          />
        }
      /> */}
      <Route path="/wishlists" element={<AllWishlists userId={2} />} />
      <Route path="/friends/:friendId" element={<FriendWishlists />} />
      <Route
        path="/friends/:friendId/:wishlistId"
        element={<FriendsSingleWishlist />}
      />
      <Route path="/add" element={<WishlistForm />} />
      <Route
        path="/wishlists/:id"
        element={<Wishlist userId={1} wishlistId={1} />}
      />
      {/* <Route path="/wishlists/:id/edit" element={<WishlistEdit />} /> */}
      <Route path="/edit" element={<EditWishlistForm />} />
      <Route path="/users" element={<Users />} />
      <Route path="/wishlist/addItem" element={<AddItemForm />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </>
)

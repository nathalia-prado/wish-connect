import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getWishlistById } from '../apis/api-my-wishlist.ts'
import type { Wishlist } from '../../models/wishlist.ts'
import { Item } from '../../models/item.ts'

interface WishlistItems extends Item {
  name: string
}

export default function Wishlist({
  userId,
  wishlistId,
}: {
  userId: number
  wishlistId: number
}) {
  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery(['wishlist', 'user', userId, wishlistId], () =>
    getWishlistById(wishlistId, userId)
  )

  if (isLoading) {
    return <div>Loading your wishlist</div>
  }

  if (isError || !wishlist) {
    return <div>There was an error retrieving your wishlist</div>
  }

  const changeChecked = async () => {
    //  handle changes to check
  }

  const handleDelete = async () => {
    //  handle delete
  }

  return (
    <div>
      <h1>{wishlist[0]?.name}</h1>
      <table>
        <thead>
          {' '}
          <tr>
            <td>Item</td>
            <td>Priority</td>
            <td>Price</td>
            <td>Purchased</td>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item: WishlistItems) => {
            return (
              <tr key={item.name}>
                <td>{item.item}</td>
                <td>{item.priority}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    onClick={changeChecked}
                    type="checkbox"
                    checked={item.purchased}
                  ></input>
                </td>
                <td>
                  <button onClick={handleDelete}>📝</button>
                </td>
                <td>
                  <button onClick={handleDelete}>❌</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <span>
        <Link to={`/wishlist/addItem`}>➕</Link>
      </span>
    </div>
  )
}

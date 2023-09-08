import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { deleteItem, getWishlistById } from '../apis/api-my-wishlist.ts'
import type { Wishlist } from '../../models/wishlist.ts'
import { Item } from '../../models/item.ts'
import { useState } from 'react'
import Calculator from './calculator.tsx'

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
  const [calculatorItems, setCalculatorItems] = useState<Item[]>([])
  const queryClient = useQueryClient()
  const {
    data: wishlist,
    isLoading,
    error,
  } = useQuery(['wishlist', 'user', userId, wishlistId], () =>
    getWishlistById(wishlistId, userId)
  )

  if (isLoading) {
    return <div>Loading your wishlist</div>
  }

  if (error || !wishlist) {
    console.log(error)
    return <div>There was an error retrieving your wishlist</div>
  }

  const changeChecked = async () => {
    //  handle changes to check
  }

  const handleDelete = async (id: number) => {
    await deleteItem(id)
    queryClient.invalidateQueries()
    //  handle delete
  }

  const handleAddCalculator = async (item: Item) => {
    setCalculatorItems([...calculatorItems, item])
  }
  console.log(calculatorItems)

  const handleEdit = async () => {}

  const handleDeleteCalculatorItems = (index: number) => {
    const updatedArr = [...calculatorItems]
    updatedArr.splice(index, 1)
    setCalculatorItems(updatedArr)
  }

  return (
    <>
      <div id="wishlist-table" className="bg-white shadow-md rounded my-6">
        <h1 id="wishlist-table-heading">{wishlist[0]?.name}</h1>
        <table className="min-w-max w-full table-auto">
          <thead>
            {' '}
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <td className="py-3 px-6 text-left">Item</td>
              <td className="py-3 px-6 text-left">Priority</td>
              <td className="py-3 px-6 text-left">Price</td>
              <td className="py-3 px-6 text-left">Purchased</td>
              <td className="py-3 px-6 text-left">Actions</td>
              <td className="py-3 px-6 text-left">Add to calculator</td>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {wishlist.map((item: WishlistItems) => {
              return (
                <tr
                  key={item.name}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.item}
                  </td>
                  <td className="py-3 px-6 text-left">{item.priority}</td>
                  <td className="py-3 px-6 text-left">{`$${item.price}`}</td>
                  <td className="py-3 px-6 text-center">
                    <input
                      onClick={changeChecked}
                      type="checkbox"
                      checked={item.purchased}
                    ></input>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button onClick={handleEdit}>📝</button>
                    <button onClick={() => handleDelete(item.id)}>❌</button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleAddCalculator(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <span className="py-3 px-6 text-left">
          <Link to={`/wishlist/addItem`}>➕</Link>
        </span>
      </div>
      <Calculator
        items={calculatorItems}
        handleDelete={handleDeleteCalculatorItems}
      />
    </>
  )
}

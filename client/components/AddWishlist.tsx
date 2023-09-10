import { ChangeEvent, FormEvent, useState } from 'react'
import { NewWishlist } from '../../models/newWishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addWishlist } from '../apis/wishlist-api'
import { Wishlist } from '../../models/wishlist'
import { useNavigate } from 'react-router-dom'

const initialFormData = {
  name: '',
  description: '',
  user_id: 1,
  isPrivate: false,
}

export default function WishlistForm() {
  const [form, setForm] = useState<NewWishlist>(initialFormData)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const wishlistMutation = useMutation(addWishlist, {
    onSuccess: async (newWishlist) => {
      const currentWishlist: Wishlist[] | undefined = queryClient.getQueryData([
        'wishlist',
      ])
      if (currentWishlist) {
        queryClient.setQueryData(
          ['wishlist'],
          [...currentWishlist, newWishlist]
        )
      } else {
        queryClient.invalidateQueries(['wishlist'])
      }
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    wishlistMutation.mutate(form)
    setForm(initialFormData)
    navigate('/wishlists')
  }

  if (wishlistMutation.isLoading) {
    return <div>Adding your wishlist</div>
  }
  return (
    <form onSubmit={handleSubmit} aria-label="Add A Wishlist">
      <p>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          id="name"
          onChange={handleChange}
          value={form.name}
          name="name"
        />
      </p>

      <p>
        <label htmlFor="rating">Description:</label>
        <br />
        <input
          id="description"
          onChange={handleChange}
          value={form.description}
          name="description"
        />
      </p>

      <button>Add</button>
    </form>
  )
}

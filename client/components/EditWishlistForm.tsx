import { ChangeEvent, FormEvent, useState } from 'react'
import { editWishList } from '../apis/edit-wishlist-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Wishlist, EditWishlist } from '../../models/wishlist'

const wishlistFormData = {
  id: 1,
  name: '',
  description: '',
  user_id: 1,
  isPrivate: false,
}

export function EditWishlistForm() {
  const [form, setForm] = useState<EditWishlist>(wishlistFormData)
  const queryClient = useQueryClient()

  const wishlistMutation = useMutation(editWishList, {
    onSuccess: async (editWishlist) => {
      const currentWishlist: Wishlist[] | undefined = queryClient.getQueryData([
        'wishlist',
      ])
      if (currentWishlist) {
        queryClient.setQueryData(
          ['wishlist'],
          [...currentWishlist, editWishlist]
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
    setForm(wishlistFormData)
  }

  if (wishlistMutation.isLoading) {
    return <div>Edit your wishlist</div>
  }
  return (
    <form onSubmit={handleSubmit} aria-label="Edit A Wishlist">
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

      <button>Edit</button>
    </form>
  )
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { deleteWishlist, getMyWishlists } from '../apis/api-my-wishlist.ts'

interface Props {
  userId: number
}

export default function AllWishlists({ userId }: Props) {
  const {
    data: wishlists,
    isLoading,
    isError,
  } = useQuery(['wishlist', 'users', userId], () => getMyWishlists(userId))
  const queryClient = useQueryClient()
  const deleteWishlistMutation = useMutation(deleteWishlist, {
    onSuccess: () => queryClient.invalidateQueries(),
  })

  if (isLoading) {
    return <div>Loading your wishlist</div>
  }

  if (isError || !wishlists) {
    return <div>There was an error retrieving your wishlists</div>
  }

  function handleDelete(id: number) {
    deleteWishlistMutation.mutate(id)
  }

  const listOfWishlists = wishlists.map((wishlist) => (
    <li
      key={wishlist.id}
      className="border-solid border-black border-2 flex flex-row justify-between"
    >
      <Link to={`/wishlists/${wishlist.id}`}>
        <div className="px-2 pb-1">
          <h2 className="text-left text-xl my-2 font-bold">{wishlist.name}</h2>
          <p>{wishlist.description}</p>
        </div>
      </Link>
      <div onClick={() => handleDelete(wishlist.id)} className="my-auto mr-2">
        <div className="cursor-pointer">❌</div>
        <div>
          <Link to={`/wishlists/${wishlist.id}/edit`}>📝</Link>
        </div>
      </div>
    </li>
  ))

  return (
    <div>
      <h1 className="text-center text-3xl">My Wishlists</h1>
      {wishlists.length === 0 && <p>Please add a wishlist</p>}
      <ul className="text-center max-w-lg mx-auto mt-10 bg-gray-100">
        {listOfWishlists}
      </ul>
      <div className="text-center m-4 text-3xl">
        <Link to={`/add`}>➕</Link>
      </div>
    </div>
  )
}

// <!-- component -->
// <!-- This is an example component -->

//     <div class='w-full gap-2 grid  grid-cols-3 '>
// <div></div>
// <div key={content} class="group relative rounded-lg overflow-hidden bg-white  hover:shadow-2xl ">

//   <div class="h-40">
//     <img
//       src='https://lp-cms-production.imgix.net/2019-06/554369495_full.jpg'
//       alt='City'
//       class="h-40 w-full object-cover object-center "
//     />
//   </div>
//   <div class="h-1/2 p-4 ">
//     <h3 class="mb-2 text-base font-semibold text-blue-800">
//       <a href='' class="hover:underline">
//         Sed ut perspiciatis unde omnis iste
//       </a>
//     </h3>
//     <p class="text-sm font-bold text-orange-500">perspiciatis</p>
//     <div class='flex flex-row justify-between text-xs mt-2'>
//     <p>perspiciatis</p><p>Sed ut perspiciatis unde omnis iste</p>
//      </div>
//   </div>
// </div>

// <div></div>
// </div>

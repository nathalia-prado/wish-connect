import connection from './connection'

// Create a wishlist
export async function addWishlist(
  userId: number,
  name: string,
  description: string,
  isPrivate: boolean,
  db = connection
) {
  const [id] = await db(`wishlist`).insert({
    user_id: userId,
    name,
    description,
    isPrivate,
  })
  return id
}

// Create an edit wishlist
export async function editWishlist(
  userId: number,
  name: string,
  description: string,
  isPrivate: boolean,
  db = connection
) {
  try {
    const existingWishlist = await db('wishlist')
      .where('user_id', userId)
      .first()
    if (!existingWishlist) {
      throw new Error('Wishlist is not found')
    }
    await db('wishlist').where('user_id', userId).update({
      name,
      description,
      isPrivate,
    })
    return { userId, name, description, isPrivate }
  } catch (error) {
    throw new Error('There has been an error')
  }
}

import connection from "./connection";

// Create a wishlist
export async function addWishlist(userId: number, name: string, 
  description: string, isPrivate: boolean, db = connection) {
  const [id] = await db(`wishlist`).insert({
    user_id: userId,
    name,
    description, 
    private: isPrivate
  })

  return id
}
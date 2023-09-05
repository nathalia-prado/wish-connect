import { Link } from "react-router-dom";
import FriendWishlistCard from "./friend-wishlist-card";
import { FriendWishlist } from "../../models/wishlist";
import useFriendWishlists from "../hooks/use-friend-wishlists";
import { useNavigate } from "react-router-dom";

interface FriendWishlistType {
  id: number
  name: string,
  wishlists: FriendWishlist[]
}

export function FriendsWishlist({ friendsWishlist } : {friendsWishlist: FriendWishlist[]}) {

  const friendWishlists: Array<FriendWishlistType> = useFriendWishlists({friendsWishlist})

  const navigate = useNavigate();

  const navigateToFriendWishlist = (friendsWishlist: FriendWishlist) => {
    navigate(`/${friendsWishlist.friendId}/${friendsWishlist.wishlistId}`)
  }

  return (
      <section className="friends-wishlist-section">
        {friendWishlists.map(entry => (
          <div key={entry.id}>
            <div className="friends-wishlist-container">
              <div className="friends-wishlist-align-center">
                <Link to={`/${entry.id}`}><img src={'/images/friend-image.png'} alt={`Friend ${entry.name}`} /></Link>
              </div>
              <div className="friends-wishlist-align-center friends-wishlist-name">
                <p>{entry.name}</p>
              </div>
            </div>
            <div className="friends-wishlist-scroll">
              {entry.wishlists.map(friendsWishlist => <div key={friendsWishlist.wishlistId} onClick={() => navigateToFriendWishlist(friendsWishlist)}><FriendWishlistCard friendsWishlist={friendsWishlist} /></div>)}
            </div>
          </div>
        ))}
      </section>
    )
}
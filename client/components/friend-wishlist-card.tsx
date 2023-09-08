import { FriendWishlist } from "../../models/wishlist";

function FriendWishlistCard({ friendsWishlist } : { friendsWishlist: FriendWishlist }) {
  
  return (
      <div className="wishlist-card-div">
        <ul aria-labelledby="wishlist" className="wishlist-card-ul">
          <li className="wishlist-card-li">
            <img src={'/images/wishlist-image.png'} alt={`Wishlist ${friendsWishlist.name}`} />
          </li>
          <li className="wishlist-card-li wishlist-card-li-data">
            <p className="wishlist-card-li-name">{friendsWishlist.name}</p>
            <p>{friendsWishlist.description}</p>
          </li>
        </ul>
      </div>
    )
  }
  
  export default FriendWishlistCard
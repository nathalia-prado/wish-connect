import { FriendWishlist } from "../../models/wishlist";

interface FriendWishlistType {
    id: number
    name: string,
    wishlists: FriendWishlist[]
}

// helper hooker to make it easier to work with the FriendWishlist array
const useFriendWishlists = ({ friendsWishlist }: {friendsWishlist: FriendWishlist[]}) => {
    let friendWishlists: Array<FriendWishlistType> = [];

    if (friendsWishlist && friendsWishlist.length) {
        // create array of friends' id (unique)
        const friendIdList = [...new Set(friendsWishlist.map(whishlist => whishlist.friendId))]

        // convert FriendWishlist model to FriendWishlistType interface
        friendWishlists = friendIdList.map(friendId => {
            const friendWishlists = friendsWishlist.filter(wishlist => wishlist.friendId === friendId)
            return {id: friendId, name: friendWishlists[0].fullName, wishlists: friendWishlists}
        })
    }

    return friendWishlists;
}

export default useFriendWishlists;
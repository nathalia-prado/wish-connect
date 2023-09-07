import { FriendWishlist } from "../../models/wishlist";

interface FriendWishlistsType {
    id: number
    name: string,
    wishlists: FriendWishlist[]
}

// helper hooker to make it easier to work with the FriendWishlist array
const useFriendWishlists = ({ friendsWishlist }: {friendsWishlist: FriendWishlist[]}) => {
    let friendWishlistsType: Array<FriendWishlistsType> = [];

    if (friendsWishlist && friendsWishlist.length) {
        // create array of friends' id (unique)
        const friendIdList = [...new Set(friendsWishlist.map(whishlist => whishlist.friendId))]

        // convert FriendWishlist model to FriendWishlistsType interface
        friendWishlistsType = friendIdList.map(friendId => {
            // find all wishlists from a specific friendId
            const friendWishlists = friendsWishlist.filter(wishlist => wishlist.friendId === friendId)
            // return a FriendWishlistsType structured object with the friend's id, name and wishlists
            return {id: friendId, name: friendWishlists[0].fullName, wishlists: friendWishlists}
        })
    }

    return friendWishlistsType;
}

export default useFriendWishlists;
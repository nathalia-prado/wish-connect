export interface Item {
  id: number
  wishlist_id: number
  item: string
  priority: string
  price: number
  purchased: boolean
}

//NewItem interface goes here

export interface NewItem {
  wishlist_id: number
  item: string
  priority: string
  price: number
  purchased: boolean
}

export interface UpdatedItem {
  item: string
  priority: string
  price: number
  purchased: boolean
}

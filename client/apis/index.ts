import request from 'superagent'
// import { Item } from '../../models/item'

export function addWish(
  userId: number,
  wishlist_id: number,
  item: string,
  priority: string,
  price: number
) {
  return request
    .post(`/api/v1/posts/${wishlist_id}/wishes`)
    .send({ item, priority, price })
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('POST', '/api/v1/posts/:wishlist_id/wishes'))
}

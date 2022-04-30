import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)

const whishlists = new Map()

export const createwhishlist = ({ customer, items }) => {
  const whishlist = {
    id: nanoid(),
    customer: customer,
    items: items,
    createdDate: new Date(),
  }
  whishlists.set(whishlist.id, whishlist)
  return whishlist
}

export const getWhishlist = (id) => {
  const whishlist = whishlists.get(id)
  if (!whishlist) {
    return {}
  }
  return whishlist
}

export const getAllWhishlists = () => {
  return [...whishlists.values()]
}

export const updatewhishlist = (id, { customer, items }) => {
  const whishlist = {
    id,
    customer: customer,
    items: items,
    createdDate: new Date(),
  }
  whishlists.set(whishlist.id, whishlist)
  return whishlist
}

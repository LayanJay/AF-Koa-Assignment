import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)

const carts = new Map()

export const createCart = ({ customer, items }) => {
  const cart = {
    id: nanoid(),
    customer: customer,
    items: items,
    createdDate: new Date(),
  }
  carts.set(cart.id, cart)
  return cart
}

export const getCart = (id) => {
  const cart = carts.get(id)
  if (!cart) {
    throw new Error(`Cart not found for ID ${id}`)
  }
  return cart
}

export const getAllCarts = () => {
  return [...carts.values()]
}

export const updateCart = (id, { customer, items }) => {
  const cart = {
    id,
    customer: customer,
    items: items,
    createdDate: new Date(),
  }
  carts.set(cart.id, cart)
  return cart
}

export const deleteCart = (id) => {
  carts.delete(id)
  return true
}

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)

const items = new Map()

export const createItem = ({ name, description, trader, price }) => {
  const item = {
    id: nanoid(),
    name: name,
    description: description,
    trader: trader,
    price: price,
    createdDate: new Date(),
  }
  items.set(item.id, item)
  return item
}

export const EditItem = (
  id,
  { name, description, price, trader, createdDate }
) => {
  const item = {
    id,
    name: name,
    description: description,
    trader: trader,
    price: price,
    createdDate: createdDate,
  }
  items.set(id, item)
  return item
}

export const getItem = (id) => {
  const item = items.get(id)
  if (!item) {
    throw new Error(`Item not found for ID ${id}`)
  }
  return item
}

export const getAllItems = () => {
  return [...items.values()]
}

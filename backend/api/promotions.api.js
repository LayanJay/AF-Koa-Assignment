import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)

const promotions = new Map()

export const createPromotions = ({ item, title, value }) => {
  const promotion = {
    id: nanoid(),
    item: item,
    title: title,
    value: value,
    createdDate: new Date(),
  }
  promotions.set(promotion.id, promotion)
  return promotion
}

export const getPromotion = (id) => {
  const promotion = promotions.get(id)
  if (!promotion) {
    throw new Error(`Promotion not found for ID ${id}`)
  }
  return promotion
}

export const getAllPromotions = () => {
  return [...promotions.values()]
}

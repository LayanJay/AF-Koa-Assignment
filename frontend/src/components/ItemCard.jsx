import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

const ItemCard = ({ item, index, cart, wishlist }) => {
  const [promotion, setPromotion] = useState({})
  const [trader, setTrader] = useState({})
  useEffect(() => {
    getPromotion()
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${item.trader}`).then((response) => {
      setTrader(response.data)
    })
  }, [])

  const getPromotion = () => {
    axios.get('http://localhost:5000/promotions/').then((response) => {
      const promotions = response.data
      const data = promotions.filter((promotion) => promotion.item === item.id)
      setPromotion(data[0])
    })
  }
  const addToCart = () => {
    const items = [...cart.items, item]
    axios.patch(`http://localhost:5000/carts/${cart.id}`, {
      customer: cart.customer,
      items: items,
    })
    window.location.reload(false)
  }

  const addToWishlist = () => {
    const items = [...wishlist.items, item]
    axios.patch(`http://localhost:5000/wishlists/${wishlist.id}`, {
      customer: wishlist.customer,
      items: items,
    })
    window.location.reload(false)
  }
  return (
    <div key={item.id}>
      <h4>
        {index + 1}. {item.name}
      </h4>
      <p> Trader : {trader.name}</p>
      <p>{item.description}</p>
      <p>$ {item.price}</p>
      <p>
        Promotions:{' '}
        {promotion && Object.keys(promotion).length !== 0 ? (
          <span>
            {promotion.title} {promotion.value} %
          </span>
        ) : (
          <span>none</span>
        )}
      </p>
      {cart && Object.keys(cart).length !== 0 && (
        <button onClick={addToCart}>Add to cart</button>
      )}
      {wishlist && Object.keys(wishlist).length !== 0 && (
        <button onClick={addToWishlist}>Add to wishlist</button>
      )}
    </div>
  )
}

export default ItemCard

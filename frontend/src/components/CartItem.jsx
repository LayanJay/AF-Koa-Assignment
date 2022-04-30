import React from 'react'

const CartItem = ({ item }) => {
  return (
    <div style={{ display: 'flex' }}>
      <p>{item.name}</p>
      <p style={{ paddingLeft: 10 }}>{item.price}</p>
    </div>
  )
}

export default CartItem

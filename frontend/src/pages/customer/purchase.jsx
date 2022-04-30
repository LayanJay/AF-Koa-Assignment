import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import PurchaseItem from '../../components/PurchaseItem'
import { useNavigate } from 'react-router-dom'

const Purchase = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [cart, setCart] = useState({})
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getCart()
  }, [])

  const calculateTotal = () => {
    let total = 0
    items.forEach((item) => {
      total += parseInt(item.price)
    })
    setTotal(total)
  }

  const getCart = () => {
    axios.get(`http://localhost:5000/carts/${id}`).then((response) => {
      setCart(response.data)
      console.log(response.data)
      setItems(response.data.items)
    })
  }

  const purchaseCart = () => {
    axios.delete(`http://localhost:5000/carts/${id}`).then((response) => {
      navigate('/')
    })
  }
  return (
    <div>
      <h1>Purchase</h1>

      <div>
        {items.map((item) => (
          <div key={nanoid()}>
            <PurchaseItem item={item} />
          </div>
        ))}
      </div>
      <h2>Total: {total}</h2>
      <button onClick={calculateTotal}>Total</button>
      <button onClick={purchaseCart}> Purchase</button>
    </div>
  )
}

export default Purchase

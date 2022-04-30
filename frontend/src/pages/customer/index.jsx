import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

import ItemCard from '../../components/ItemCard'
import WishlistItem from '../../components/WishlistItem'
import CartItem from '../../components/CartItem'

const CustomerHome = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [items, setItems] = useState([])
  const [cart, setCart] = useState({})
  const [wishlist, setWishlist] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`).then((response) => {
      const user = response.data
      if (user.hasOwnProperty('id')) {
        setUser(user)
      } else {
        navigate('/')
      }
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/items/').then((response) => {
      const items = response.data
      setItems(items)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:5000/carts/').then((response) => {
      const carts = response.data
      const data = carts.filter((cart) => cart.customer === user.id)
      setCart(data[0])
    })
  })

  useEffect(() => {
    axios.get('http://localhost:5000/wishlists/').then((response) => {
      const whislists = response.data
      const data = whislists.filter((w) => w.customer === user.id)
      setWishlist(data[0])
    })
  })

  const createCart = () => {
    axios
      .post('http://localhost:5000/carts/', { customer: user.id, items: [] })
      .then((response) => {
        setCart(response.data)
      })
  }

  const createWishlist = () => {
    axios
      .post('http://localhost:5000/wishlists/', {
        customer: user.id,
        items: [],
      })
      .then((response) => {
        setWishlist(response.data)
      })
  }

  const getPromotion = (itemId) => {
    axios.get('http://localhost:5000/promotions/').then((response) => {
      const promotions = response.data
      const data = promotions.filter((e) => e.item === itemId)
      if (data.length !== 0) {
        const promo = data[0]
        return parseInt(promo.value)
      } else {
        return 0
      }
    })
  }

  return (
    <div>
      <h2>CustomerHome: {user.name}</h2>
      <div>
        <div>
          <h3>Items</h3>
          <div>
            {items.map((item, index) => (
              <ItemCard
                cart={cart}
                wishlist={wishlist}
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>Cart</h3>
          {cart && Object.keys(cart).length !== 0 ? (
            <div>
              <div>
                {cart.items &&
                  cart.items.map((item) => (
                    <CartItem key={nanoid()} item={item} />
                  ))}
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate(`/customer/purchase/${cart.id}`)
                  }}
                >
                  Purchase
                </button>
              </div>
            </div>
          ) : (
            <button onClick={createCart}>Create Cart</button>
          )}
        </div>
        <div>
          <h3>Wishlist</h3>

          {wishlist && Object.keys(wishlist).length !== 0 ? (
            <div>
              {wishlist.items &&
                wishlist.items.map((item) => (
                  <WishlistItem key={nanoid()} item={item} />
                ))}
            </div>
          ) : (
            <button onClick={createWishlist}>Create Wishlist</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerHome

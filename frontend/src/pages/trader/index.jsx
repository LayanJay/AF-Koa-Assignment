import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddItems from '../../components/AddItems'
import Items from '../../components/Items'

const TraderHome = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [items, setItems] = useState([])
  const [updateItems, setUpdateItems] = useState(false)

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
      const allItems = response.data
      const itemsArray = allItems.filter((item) => item.trader === id)
      setItems(itemsArray)
    })
  }, [user, updateItems])

  return (
    <div>
      <h2>TraderHome: {user.name}</h2>
      <div>
        <h3>Items</h3>
        <AddItems userId={id} />
        <div>
          <h3>Inventory</h3>
          {items.map((item, index) => (
            <Items
              key={item.id}
              item={item}
              index={index}
              updateItems={updateItems}
              setUpdateItems={setUpdateItems}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TraderHome

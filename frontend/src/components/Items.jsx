import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import AddPromotion from './AddPromotion'
import UpdateItems from './UpdateItems'
const Items = ({ item, index, updateItems, setUpdateItems }) => {
  const [showUpdate, setShowUpdate] = useState(false)
  const [showPromotionForm, setShowPromotionForm] = useState(false)
  const [promotion, setPromotion] = useState({})

  useEffect(() => {
    getPromotion()
  }, [])

  const getPromotion = () => {
    console.log(item.id)
    axios.get('http://localhost:5000/promotions/').then((response) => {
      const promotions = response.data
      console.log(promotions)
      const data = promotions.filter((promotion) => promotion.item === item.id)
      setPromotion(data[0])
      setUpdateItems(!updateItems)
    })
  }

  return (
    <div key={item.id}>
      <h4>
        {index + 1}. {item.name}
      </h4>
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
      <button onClick={() => setShowUpdate(!showUpdate)}>Update</button>

      {(promotion && Object.keys(promotion).length !== 0) || (
        <button onClick={() => setShowPromotionForm(!showPromotionForm)}>
          Add Promotion
        </button>
      )}

      {showUpdate && <UpdateItems item={item} setShow={setShowUpdate} />}
      {showPromotionForm && (
        <AddPromotion setShow={setShowPromotionForm} item={item.id} />
      )}
    </div>
  )
}

export default Items

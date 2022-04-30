import React from 'react'
import { useParams } from 'react-router-dom'

const Purchase = () => {
  const { id } = useParams()
  return <div>Purchase</div>
}

export default Purchase

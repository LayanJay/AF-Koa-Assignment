import axios from 'axios'
import { useEffect, useState } from 'react'

const UpdateItems = ({ item, setShow }) => {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
  })

  useEffect(() => {
    setInputs({
      name: item.name,
      description: item.description,
      price: item.price,
    })
    console.log(item)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
      trader: item.trader,
      createdDate: item.createdDate,
    }

    axios
      .patch(`http://localhost:5000/items/${item.id}`, newItem)
      .then((response) => {
        console.log(response.data)
      })

    window.location.reload(false)
    setShow(false)
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs({ ...inputs, [name]: value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          value={inputs.description}
          onChange={handleChange}
        />
        <label htmlFor='price' name='price'>
          Price
        </label>
        <input
          type='number'
          name='price'
          value={inputs.price}
          onChange={handleChange}
        />
        <input type='submit' value='Update' />
      </form>
    </div>
  )
}

export default UpdateItems

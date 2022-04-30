import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const AddItems = ({ userId }) => {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const item = { ...inputs, trader: userId }
    axios.post('http://localhost:5000/items', item).then((response) => {
      console.log(response)
    })

    setInputs({
      name: '',
      description: '',
      price: '',
    })
    window.location.reload(false)
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs({ ...inputs, [name]: value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Add Items</h4>
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
        <input type='submit' value='Add' />
      </form>
    </div>
  )
}

export default AddItems

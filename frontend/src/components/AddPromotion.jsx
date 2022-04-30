import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const AddPromotion = ({ setShow, item }) => {
  const [inputs, setInputs] = useState({
    title: '',
    value: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()

    const promotion = {
      ...inputs,
      item: item,
    }
    axios
      .post('http://localhost:5000/promotions/', promotion)
      .then((response) => console.log(response.data))
    setShow(false)
    window.location.reload(false)
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs({ ...inputs, [name]: value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Title</label>
      <input
        type='text'
        name='title'
        value={inputs.title}
        onChange={handleChange}
      />

      <label htmlFor='price' name='price'>
        Value
      </label>
      <input
        type='number'
        name='value'
        value={inputs.value}
        onChange={handleChange}
      />
      <input type='submit' value='Add Promotion' />
    </form>
  )
}

export default AddPromotion

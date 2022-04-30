import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    role: 'customer',
  })

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios
      .get(`http://localhost:5000/users/login/${inputs.email}`)
      .then((response) => {
        const exists = response.data.available
        if (exists) {
          const user = response.data.user
          if (user.role === 'customer') navigate(`/customer/${user.id}`)
          if (user.role === 'trader') navigate(`/trader/${user.id}`)
        } else {
          axios.post('http://localhost:5000/users', inputs).then((response) => {
            console.log(response)
            const user = response.data
            if (user.role === 'customer') navigate(`/customer/${user.id}`)
            if (user.role === 'trader') navigate(`/trader/${user.id}`)
          })
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to the system</h2>
      <label htmlFor='name'>Enter Name</label>

      <br />
      <input
        id='name'
        type='name'
        name='name'
        value={inputs.name}
        onChange={handleChange}
      />
      <br />
      <br />
      <label htmlFor='email'>Enter Email</label>

      <br />
      <input
        id='email'
        type='email'
        name='email'
        value={inputs.email}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type='radio'
        id='customer'
        name='role'
        value='customer'
        checked={inputs.role === 'customer'}
        onChange={handleChange}
      />
      <label htmlFor='customer'>Customer</label>
      <input
        type='radio'
        id='trader'
        name='role'
        value='trader'
        checked={inputs.role === 'trader'}
        onChange={handleChange}
      />
      <label htmlFor='trader'>Trader</label>
      <br />
      <br />
      <input type='submit' value='Login' />
    </form>
  )
}

export default Home

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12)

const users = new Map()
users.set('1234234', {
  id: '1234234',
  name: 'Kmala',
  email: 'abceded@gmail.com',
  role: 'trader',
})

export const createUser = ({ name, email, role }) => {
  const user = {
    id: nanoid(),
    name: name,
    email: email,
    role: role,
    createdDate: new Date(),
  }
  users.set(user.id, user)
  return user
}

export const getUser = (id) => {
  const user = users.get(id)
  if (!user) {
    return {}
  }
  return user
}

export const getAllUsers = () => {
  return [...users.values()]
}

export const checkUser = (email) => {
  console.log(email)
  const userArray = [...users.values()]
  const matches = userArray.filter((user) => user.email === email)

  if (matches.length > 0) {
    return { available: true, user: matches[0] }
  } else {
    return { available: false, user: {} }
  }
}

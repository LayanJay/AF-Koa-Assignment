import Router from '@koa/router'

import {
  checkUser,
  createUser,
  getUser,
  getAllUsers,
} from '../api/users.api.js'

const usersRouter = new Router({
  prefix: '/users',
})

usersRouter.post('/', (ctx) => {
  const data = ctx.request.body
  const user = createUser(data)
  ctx.set('Content-Type', 'application.json')
  ctx.body = user
  ctx.status = 201
})

usersRouter.get('/:id', (ctx) => {
  const id = ctx.params.id
  console.log(id)
  ctx.body = getUser(id)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

usersRouter.get('/login/:email', (ctx) => {
  const email = ctx.params.email
  ctx.body = checkUser(email)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

usersRouter.get('/', (ctx) => {
  ctx.body = getAllUsers()
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

export default usersRouter

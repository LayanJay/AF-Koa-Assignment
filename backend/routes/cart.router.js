import Router from '@koa/router'
import {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
} from '../api/cart.api.js'

const cartsRouter = new Router({
  prefix: '/carts',
})

cartsRouter.post('/', (ctx) => {
  const data = ctx.request.body
  const cart = createCart(data)
  ctx.set('Content-Type', 'application.json')
  ctx.body = cart
  ctx.status = 201
})

cartsRouter.get('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = getCart(id)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

cartsRouter.get('/', (ctx) => {
  ctx.body = getAllCarts()
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

cartsRouter.patch('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = updateCart(id, ctx.request.body)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

export default cartsRouter

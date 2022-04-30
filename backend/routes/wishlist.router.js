import Router from '@koa/router'
import {
  createwhishlist,
  getAllWhishlists,
  getWhishlist,
  updatewhishlist,
} from '../api/wishlist.api.js'

const wishlistsRouter = new Router({
  prefix: '/wishlists',
})

wishlistsRouter.post('/', (ctx) => {
  const data = ctx.request.body
  const wishlist = createwhishlist(data)
  ctx.set('Content-Type', 'application.json')
  ctx.body = wishlist
  ctx.status = 201
})

wishlistsRouter.get('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = getWhishlist(id)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

wishlistsRouter.get('/', (ctx) => {
  ctx.body = getAllWhishlists()
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

wishlistsRouter.patch('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = updatewhishlist(id, ctx.request.body)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

export default wishlistsRouter

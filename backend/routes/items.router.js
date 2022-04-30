import Router from '@koa/router'
import { createItem, EditItem, getAllItems, getItem } from '../api/items.api.js'

const itemsRouter = new Router({
  prefix: '/items',
})

itemsRouter.post('/', (ctx) => {
  const data = ctx.request.body
  const user = createItem(data)
  ctx.set('Content-Type', 'application.json')
  ctx.body = user
  ctx.status = 201
})

itemsRouter.get('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = getItem(id)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

itemsRouter.get('/', (ctx) => {
  ctx.body = getAllItems()
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

itemsRouter.patch('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = EditItem(id, ctx.request.body)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

export default itemsRouter

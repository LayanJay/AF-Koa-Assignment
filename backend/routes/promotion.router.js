import Router from '@koa/router'
import {
  createPromotions,
  getAllPromotions,
  getPromotion,
} from '../api/promotions.api.js'

const promotionsRouter = new Router({
  prefix: '/promotions',
})

promotionsRouter.post('/', (ctx) => {
  const data = ctx.request.body
  const promotion = createPromotions(data)
  ctx.set('Content-Type', 'application.json')
  ctx.body = promotion
  ctx.status = 201
})

promotionsRouter.get('/:id', (ctx) => {
  const id = ctx.params.id
  ctx.body = getPromotion(id)
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

promotionsRouter.get('/', (ctx) => {
  ctx.body = getAllPromotions()
  ctx.set('Content-Type', 'application.json')
  ctx.status = 200
})

export default promotionsRouter

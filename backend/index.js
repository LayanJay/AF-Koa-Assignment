import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import usersRouter from './routes/users.router.js'
import itemsRouter from './routes/items.router.js'
import promotionsRouter from './routes/promotion.router.js'
import cartsRouter from './routes/cart.router.js'
import wishlistsRouter from './routes/wishlist.router.js'
import cors from '@koa/cors'

const PORT = 5000
const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(usersRouter.routes()).use(usersRouter.allowedMethods())
app.use(itemsRouter.routes()).use(itemsRouter.allowedMethods())
app.use(promotionsRouter.routes()).use(promotionsRouter.allowedMethods())
app.use(cartsRouter.routes()).use(cartsRouter.allowedMethods())
app.use(wishlistsRouter.routes()).use(wishlistsRouter.allowedMethods())

app.use((ctx) => {
  ctx.set('Context-Type', 'text/html')
  ctx.body = '<h3>Hello World</h3>'
  ctx.status = 200
})

app.listen(PORT, () => {
  console.log('Server running on: ' + PORT)
})

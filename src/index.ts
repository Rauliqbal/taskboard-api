import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { Routes } from './routes'


const app = new Hono()

// Middleware
app.use(logger())
app.use("*", cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/', Routes)

export default app

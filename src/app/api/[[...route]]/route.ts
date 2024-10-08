import { handle } from 'hono/vercel'
import { honoFactory } from './factory'
import { healthRoute } from './health'
import { messageRoute } from './message'
import { resultRoute } from './result'
import { roomRoute } from './room'
import { userRouter } from './user'

export const runtime = 'edge'

const app = honoFactory.createApp().basePath('/api')

const route = app
  .route('/health', healthRoute)
  .route('/room', roomRoute)
  .route('/message', messageRoute)
  .route('/user', userRouter)
  .route('/result', resultRoute)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof route

import { handle } from 'hono/vercel'
import { honoFactory } from './factory'
import { healthRoute } from './health'
import { messageRoute } from './message'
import { roomRoute } from './room'

export const runtime = 'edge'

const app = honoFactory.createApp().basePath('/api')

const route = app
  .route('/health', healthRoute)
  .route('/room', roomRoute)
  .route('/message', messageRoute)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof route

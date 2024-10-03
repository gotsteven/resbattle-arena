import { handle } from 'hono/vercel'
import { honoFactory } from './factory'
import { gameRoute } from './game'
import { healthRoute } from './health'
import { messageRoute } from './message'
import { getResultRoute } from './result'
import { getAllResultsRoute } from './result/all'
import { roomRoute } from './room'
import { UserRouter } from './user'

export const runtime = 'edge'

const app = honoFactory.createApp().basePath('/api')

const route = app
  .route('/health', healthRoute)
  .route('/room', roomRoute)
  .route('/message', messageRoute)
  .route('/user', UserRouter)
  .route('/result', getResultRoute)
  .route('/result/all', getAllResultsRoute)
  .route('/game', gameRoute)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof route

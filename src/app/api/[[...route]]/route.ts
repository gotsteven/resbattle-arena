import { handle } from 'hono/vercel'
import { honoFactory } from './factory'
import { healthRoute } from './health'
import { getRoomRoute } from './room/[roomId]'
import { createRoomRoute } from './room/create'
import { deleteRoomRoute } from './room/delete'
import { sendMessageRoute } from './room/message/send'
import { updateRoomRoute, updateRoomStatusRoute } from './room/update'

export const runtime = 'edge'

const app = honoFactory.createApp().basePath('/api')

const route = app
  .route('/health', healthRoute)
  .route('/room', createRoomRoute)
  .route('/room', getRoomRoute)
  .route('/room', updateRoomRoute)
  .route('/room', deleteRoomRoute)
  .route('/room', updateRoomStatusRoute)
  .route('/room', sendMessageRoute)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof route

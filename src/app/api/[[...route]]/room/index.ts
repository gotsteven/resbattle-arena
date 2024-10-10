import { roomRepo } from '@/repositories/roomRepo'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'
import { specifyRoomRoute } from './[roomId]'

const postReqBodySchema = z.object({
  topic: z.string(),
  player1_id: z.string(),
})

export const roomRoute = honoFactory
  .createApp()
  .route('/:roomId', specifyRoomRoute)
  .post('/', zValidator('json', postReqBodySchema), async (c) => {
    const { topic, player1_id } = c.req.valid('json')
    const room = await roomRepo.create(topic, player1_id)
    return c.json(room)
  })

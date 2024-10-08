import { roomRepo } from '@/repositories/roomRepo'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../../factory'
import { roomStatusRoute } from './status'

export const roomIdPathParamSchema = z.object({
  roomId: z.string(),
})

const postReqBodySchema = z.object({
  status: z.string(),
  p1_pos: z.string(),
  p2_pos: z.string(),
  p2_id: z.string(),
})

export const specifyRoomRoute = honoFactory
  .createApp()
  .route('/status', roomStatusRoute)
  .get('/', zValidator('param', roomIdPathParamSchema), async (c) => {
    const { roomId } = c.req.valid('param')
    const room = await roomRepo.findUnique(roomId)
    return c.json(room)
  })
  .put(
    '/',
    zValidator('param', roomIdPathParamSchema),
    zValidator('json', postReqBodySchema),
    async (c) => {
      const { roomId } = c.req.valid('param')
      const { status, p2_id, p1_pos, p2_pos } = c.req.valid('json')
      const updatedRoom = await roomRepo.update(roomId, status, p2_id, p1_pos, p2_pos)
      return c.json(updatedRoom)
    },
  )
  .delete('/', zValidator('param', roomIdPathParamSchema), async (c) => {
    const { roomId } = c.req.valid('param')
    const deletedRoom = await roomRepo.delete(roomId)
    return c.json(deletedRoom)
  })

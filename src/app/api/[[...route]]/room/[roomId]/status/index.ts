import { roomRepo } from '@/repositories/roomRepo'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { roomIdPathParamSchema } from '..'
import { honoFactory } from '../../../factory'

const patchReqBodySchema = z.object({
  status: z.string(),
})

export const roomStatusRoute = honoFactory
  .createApp()
  .get('/', zValidator('param', roomIdPathParamSchema), async (c) => {
    const { roomId } = c.req.valid('param')
    const status = await roomRepo.getStatus(roomId)
    return c.json({ status })
  })
  .patch(
    '/',
    zValidator('param', roomIdPathParamSchema),
    zValidator('json', patchReqBodySchema),
    async (c) => {
      const { roomId } = c.req.valid('param')
      const { status } = c.req.valid('json')
      const updatedRoom = await roomRepo.updateStatus(roomId, status)
      return c.json(updatedRoom)
    },
  )

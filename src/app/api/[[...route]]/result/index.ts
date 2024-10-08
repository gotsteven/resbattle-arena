import { auth } from '@/auth'
import { resultRepo } from '@/repositories/resultRepo'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'

const getRoomIdParamSchema = z.object({
  roomId: z.string(),
})

export const resultRoute = honoFactory
  .createApp()
  .get('/', async (c) => {
    const session = await auth()
    if (session === null) return c.json({ error: 'Unauthorized' }, 401)

    const results = await resultRepo.findAllOfUser(session.user.id)
    return c.json(results)
  })
  .get('/:roomId', zValidator('param', getRoomIdParamSchema), async (c) => {
    const { roomId } = c.req.valid('param')
    const results = await resultRepo.findAllInRoom(roomId)
    return c.json(results)
  })

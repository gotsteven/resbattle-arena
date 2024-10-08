import { userRepo } from '@/repositories/userRepo'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { honoFactory } from '../factory'

const getQuerySchema = z.object({
  userId: z.string(),
})

export const userRouter = honoFactory
  .createApp()
  .get('/', zValidator('query', getQuerySchema), async (c) => {
    const { userId } = c.req.valid('query')

    const user = await userRepo.findOne(userId)
    return c.json(user)
  })

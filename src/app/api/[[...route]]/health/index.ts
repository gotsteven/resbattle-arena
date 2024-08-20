import { sql } from '@vercel/postgres'
import { honoFactory } from '../factory'

export const healthRoute = honoFactory.createApp().get('/', async (c) => {
  try {
    await sql`SELECT CURRENT_TIMESTAMP`
    return c.json({ status: 'ok' })
  } catch (e) {
    return c.json({ status: 'error' }, 500)
  }
})

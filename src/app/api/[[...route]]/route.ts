import { handle } from 'hono/vercel'
import { honoFactory } from './factory'
import { healthRoute } from './health'

export const runtime = 'edge'

const app = honoFactory.createApp().basePath('/api')

const route = app.route('/health', healthRoute)

export const GET = handle(app)

export type AppType = typeof route

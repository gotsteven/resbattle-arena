import { cors } from 'hono/cors'
import { createFactory } from 'hono/factory'

const honoFactory = createFactory({
  initApp: (app) => {
    app.use(
      cors({
        origin: (origin) => origin,
        allowMethods: ['GET', 'POST'],
      }),
    )
  },
})

export { honoFactory }

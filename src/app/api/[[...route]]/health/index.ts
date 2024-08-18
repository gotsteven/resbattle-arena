import { honoFactory } from '../factory'

export const healthRoute = honoFactory.createApp().get('/', async (c) => {
  // TODO: 将来的にはDBや外部APIとの接続を確認する
  return c.json({ status: 'ok' })
})

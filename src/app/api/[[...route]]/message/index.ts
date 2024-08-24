import { honoFactory } from '../factory'
import { getMessageRoute } from './get'
import { sendMessageRoute } from './send'
import { testRoute } from './test'

export const messageRoute = honoFactory
  .createApp()
  .route('/get', getMessageRoute)
  .route('/send', sendMessageRoute)
  .route('/test', testRoute)

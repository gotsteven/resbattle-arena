import { honoFactory } from '../factory'
import { getMessageRoute } from './get'
import { sendMessageRoute } from './send'

export const messageRoute = honoFactory
  .createApp()
  .route('/get', getMessageRoute)
  .route('/send', sendMessageRoute)

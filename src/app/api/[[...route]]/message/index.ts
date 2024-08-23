import { honoFactory } from '../factory'
import { getRoomRoute } from './get'
import { sendMessageRoute } from './send'

export const messageRoute = honoFactory
  .createApp()
  .route('/get', getRoomRoute)
  .route('/send', sendMessageRoute)

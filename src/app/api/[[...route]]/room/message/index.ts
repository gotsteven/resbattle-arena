import { honoFactory } from '../../factory'
import { getRoomRoute } from './get'
import { sendMessageRoute } from './send'

export const roomMessageRoute = honoFactory
  .createApp()
  .route('/get', getRoomRoute)
  .route('/send', sendMessageRoute)

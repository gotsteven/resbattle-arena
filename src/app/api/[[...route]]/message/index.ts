import { honoFactory } from '../factory'
import { getLatestMessageRoute, getMessageRoute } from './get'
import { sendMessageRoute } from './send'

export const messageRoute = honoFactory
  .createApp()
  .route('/get', getMessageRoute)
  .route('/get', getLatestMessageRoute)
  .route('/send', sendMessageRoute)

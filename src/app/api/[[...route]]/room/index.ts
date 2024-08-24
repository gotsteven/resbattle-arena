import { honoFactory } from '../factory'
import { getRoomRoute } from './[roomId]'
import { createRoomRoute } from './create'
import { deleteRoomRoute } from './delete'
import { updateRoomRoute, updateRoomStatusRoute } from './update'

export const roomRoute = honoFactory
  .createApp()
  .route('/create', createRoomRoute)
  .route('/update', updateRoomRoute)
  .route('/update', updateRoomStatusRoute)
  .route('/delete', deleteRoomRoute)
  .route('/', getRoomRoute)

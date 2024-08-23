import { honoFactory } from '../factory'
import { getRoomRoute } from './[roomId]'
import { createRoomRoute } from './create'
import { deleteRoomRoute } from './delete'
import { roomMessageRoute } from './message'
import { updateRoomRoute } from './update'

export const roomRoute = honoFactory
  .createApp()
  .route('/', getRoomRoute) // `/:roomId`
  .route('/create', createRoomRoute)
  .route('/update', updateRoomRoute)
  .route('/delete', deleteRoomRoute)
  .route('/message', roomMessageRoute)

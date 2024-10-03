import { honoFactory } from '../factory'
import { startGameRoute } from './start'

export const gameRoute = honoFactory.createApp().route('/start', startGameRoute)

import type { Room } from '@/types/types'

export const RoomData = ({ room, player_id }: { room: Room; player_id: string }) => {
  return (
    <div>
      RoomPage
      <p>room_id: {room.id}</p>
      <p>topic: {room?.topic}</p>
      <p>status: {room.status}</p>
      <div>
        <h3>Position</h3>
        <p>
          {player_id === room.player1_id ? 'あなた' : 'player1'}: {room.player1_position}
        </p>
        <p>
          {player_id === room.player2_id ? 'あなた' : 'player2'}: {room.player2_position}
        </p>
      </div>
    </div>
  )
}

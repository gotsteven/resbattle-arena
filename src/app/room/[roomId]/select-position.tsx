import { apiClient } from '@/lib/apiClient'

export const SelectPosition = ({ user, roomId }: { user: string; roomId: string }) => {
  const updateRoom = async (p2_pos: string) => {
    const p1_pos = p2_pos === 'agree' ? 'disagree' : 'agree'
    const p2_id = user
    await apiClient.api.room.update.$post({
      json: { id: roomId, p1_pos, p2_pos, p2_id, status: 'ready' },
    })
  }
  return (
    <div>
      賛成反対を選択してください
      <div>
        <button type="button" onClick={() => updateRoom('agree')}>
          賛成
        </button>
      </div>
      <div>
        <button type="button" onClick={() => updateRoom('disagree')}>
          反対
        </button>
      </div>
    </div>
  )
}

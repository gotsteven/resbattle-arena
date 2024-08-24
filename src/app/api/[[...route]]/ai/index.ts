import { dbClient } from '@/lib/dbClient'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { and, eq } from 'drizzle-orm'
import { debateMessages, debateRooms } from '../../../../drizzle/schema'
import { honoFactory } from '../factory'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const model = openai('gpt-4o-mini')

export const AIController = honoFactory.createApp().post('/:roomId/:playerId', async (c) => {
  const { roomId, playerId } = c.req.param()

  try {
    const room = await dbClient
      .select({
        topic: debateRooms.topic,
      })
      .from(debateRooms)
      .where(eq(debateRooms.id, roomId))

    const topic = room[0].topic

    const messages = await dbClient
      .select()
      .from(debateMessages)
      .where(and(eq(debateMessages.room_id, roomId), eq(debateMessages.player_id, playerId)))
      .orderBy(debateMessages.msg_id)

    const prompt = `トピック: ${topic}\n\n${messages.map((msg) => `プレイヤー: ${msg.message}`).join('\n')}\n\nこのトピックについてそれぞれの発言内容を判断した上で返答してください。`

    const res = await generateText({
      model,
      prompt: `以下の内容をあなたが判断して日本語で返答してください。\n\n${prompt}`,
    })

    return c.json({ response: res })
  } catch (error) {
    console.error('Error processing AI request:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

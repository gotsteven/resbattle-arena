import { dbClient } from '@/lib/dbClient'
import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { and, eq } from 'drizzle-orm'
import { debateMessages } from '../../../../drizzle/schema'
import { honoFactory } from '../factory'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const model = openai('gpt-4o-mini')

export const AIController = honoFactory.createApp().post('/:roomId/:playerId', async (c) => {
  const { roomId, playerId } = c.req.param()

  try {
    const messages = await dbClient
      .select()
      .from(debateMessages)
      .where(and(eq(debateMessages.room_id, roomId), eq(debateMessages.player_id, playerId)))
      .orderBy(debateMessages.msg_id)

    const prompt = messages.map((msg) => `Player: ${msg.message}`).join('\n')

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

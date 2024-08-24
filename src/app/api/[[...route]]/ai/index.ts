import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import {} from 'drizzle-orm'
import { z } from 'zod'
import {} from '../../../../drizzle/schema'
import { honoFactory } from '../factory'
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const model = openai('gpt-4o-mini')

// export const AIController = honoFactory.createApp().post('/:roomId/:playerId', async (c) => {
export const AIController = honoFactory.createApp().get('/', async (c) => {
  // const { roomId, playerId } = c.req.param()

  // try {
  //   const room = await dbClient
  //     .select({
  //       topic: debateRooms.topic,
  //     })
  //     .from(debateRooms)
  //     .where(eq(debateRooms.id, roomId))

  //   const topic = room[0].topic

  //   const messages = await dbClient
  //     .select()
  //     .from(debateMessages)
  //     .where(and(eq(debateMessages.room_id, roomId), eq(debateMessages.player_id, playerId)))
  //     .orderBy(debateMessages.msg_id)

  //   const prompt = `トピック: ${topic}${messages.map((msg) => `プレイヤー: ${msg.message}`).join('\n')}このトピックについてそれぞれの発言内容を判断した上で返答してください。`

  // const res = await generateText({
  //   model,
  //   prompt: `以下の内容をあなたが判断して日本語で返答してください。${prompt}`,
  // })
  const messages = [
    {
      player: '賛成',
      message:
        '大学で学ぶ専門知識やスキルは、将来のキャリアに直結する。就職市場での競争力を高め、より良い職業選択の機会を得ることができる。',
    },
    {
      player: '反対',
      message: '遊んだ方が楽しい。',
    },
    {
      player: '賛成',
      message:
        '大学での勉強は、批判的思考力や問題解決能力を養う。これらのスキルは、どのような職業においても重要で、人生全般で役立つ。',
    },
    {
      player: '反対',
      message: '勉強なんて意味ない。',
    },
  ]

  const topic = '大学生は勉強すべきか否か'
  try {
    const { object } = await generateObject({
      model,
      schema: z.object({
        info: z.object({
          winner: z.number(),
          advantageRate: z.object({
            player1: z.number(),
            player2: z.number(),
          }),
          reason: z.string(),
          feedback: z.string(),
        }),
      }),
      prompt: `あなたは非常に公平で詳細なディベートの審判です。私情を挟まず、ディベートのやり取りのみで厳密に判断してください。
論題は「${topic}」です。ディベートデータには賛成派と反対派の主張が含まれています。

  以下の内容に基づいて判断を行い、次の項目を出力してください：
  1. 勝者の決定（賛成が1、反対が2）
  2. advantageRateの算出（やり取りの内容や説得力に基づき、幅広い割合で評価してください。空想で100人の人間を作り出し、その人たちの賛成と反対の意見を想像しそれらの結果に基づいて算出してください）
  3. 判定の理由（具体的なポイントを挙げてください）
  4. 両者へのフィードバック（賛成側と反対側それぞれに対して、改善点や良い点を具体的に多くかつ簡潔に指摘してください）

  ディベートデータ: ${messages}`,
    })
    return c.json({ object })
  } catch (error) {
    console.error('Error processing AI request:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

import type { AIResponse } from '@/types/types'
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const model = openai('gpt-4o-mini')

type OrganizedMessages = {
  msg_id: number
  position: string | null
  player_id: string
  message: string
}

export const judgementAI = async (
  organizedMessages: OrganizedMessages[],
  topic: string,
): Promise<AIResponse> => {
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
      prompt: `あなたは非常に公平で詳細なディベートの審判です。私情を挟まず、ディベートのやり取りのみで厳密に判断してください。論題は「${topic}」です。ディベートデータには賛成派と反対派の主張が含まれています。

    以下の内容に基づいて判断を行い、次の項目を出力してください：
    1. 勝者の決定（賛成が1、反対が2）
    2. advantageRateの算出（やり取りの内容や説得力に基づき、幅広い割合で評価してください。空想で100人の人間を作り出し、その人たちの賛成と反対の意見を想像しそれらの結果に基づいて算出してください）
    3. 判定の理由（具体的なポイントを挙げてください）
    4. 両者へのフィードバック（賛成側と反対側それぞれに対して、改善点や良い点を具体的に多くかつ簡潔に指摘してください）

    ディベートデータ: ${organizedMessages}`,
    })
    return object
  } catch (error) {
    const errorObject = {
      info: {
        winner: 0,
        advantageRate: {
          player1: 0,
          player2: 0,
        },
        reason: '取得できませんでした',
        feedback: '取得できませんでした',
      },
    }
    return errorObject
  }
}

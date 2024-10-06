import { aiClient } from '@/lib/aiClient'
import { aiModels } from '@/lib/aiModels'
import type { MessageWithPosition } from '@/types/message'
import { z } from 'zod'

const judgeResultSchema = z.object({
  info: z.object({
    winner: z.number(),
    advantageRate: z.object({
      player1: z.number(),
      player2: z.number(),
    }),
    reason: z.string(),
    feedback: z.string(),
  }),
})

const judgePrompt = (topic: string, messages: MessageWithPosition[]) => `
あなたは非常に公平で詳細なディベートの審判です。
私情を挟まず、ディベートのやり取りのみで厳密に判断してください。
論題は「${topic}」です。
ディベートデータには賛成派と反対派の主張が含まれています。

以下の内容に基づいて判断を行い、次の項目を出力してください：
1. 勝者の決定 (賛成が1、反対が2)
2. advantageRateの算出 (やり取りの内容や説得力に基づき、幅広い割合で評価してください。空想で100人の人間を作り出し、その人たちの賛成と反対の意見を想像しそれらの結果に基づいて算出してください)
3. 判定の理由 (具体的なポイントを挙げてください)
4. 両者へのフィードバック (賛成側と反対側それぞれに対して、改善点や良い点を具体的に多くかつ簡潔に指摘してください)

ディベートデータ:
${messages
  .map(
    ({ message, position }, index) => `
${index + 1}. ${position === 'agree' ? '賛成' : '反対'}
${message}
`,
  )
  .join('\n\n')}
`

const failedJudgeResult = {
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

export const judgeDebate = async (messages: MessageWithPosition[], topic: string) => {
  const judgeResultEntires = await Promise.all(
    aiModels.map(async (model) => {
      const judgeResult = await aiClient
        .generateObject(model, judgeResultSchema, judgePrompt(topic, messages))
        .catch(() => failedJudgeResult)
      return [model.provider, judgeResult] as const
    }),
  )

  const judgeResults = Object.fromEntries(judgeResultEntires)

  return judgeResults
}

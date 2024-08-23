import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { honoFactory } from '../factory'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const model = openai('gpt-4o-mini')

export const AIController = honoFactory.createApp().post('/', async (c) => {
  const { prompt } = await c.req.json()
  try {
    const res = await generateText({
      model,
      prompt,
    })
    return c.json({ response: res })
  } catch (error) {
    console.error('Error creating room:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

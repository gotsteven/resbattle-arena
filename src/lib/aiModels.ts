import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { CLAUDE_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY } from './envValue'

const openaiProvider = createOpenAI({
  apiKey: OPENAI_API_KEY,
  compatibility: 'strict',
})

export const openaiModel = openaiProvider('gpt-4o')

const anthropicProvider = createAnthropic({
  apiKey: CLAUDE_API_KEY,
})

export const anthropicModel = anthropicProvider('claude-3-5-sonnet-20240620')

const googleAiProvider = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY,
})

export const googleAiModel = googleAiProvider('gemini-1.5-pro')

export const aiModels = [openaiModel, anthropicModel, googleAiModel]
export type AiModel = (typeof aiModels)[number]

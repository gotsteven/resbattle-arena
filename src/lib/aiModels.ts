import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createMistral } from '@ai-sdk/mistral'
import { createOpenAI } from '@ai-sdk/openai'
import {
  CF_ACCOUNT_ID,
  CF_AIGATEWAY_NAME,
  CLAUDE_API_KEY,
  GEMINI_API_KEY,
  MISTRAL_API_KEY,
  OPENAI_API_KEY,
} from './envValue'

const AIGATEWAY_BASEURL = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_ID}/${CF_AIGATEWAY_NAME}`

const openaiProvider = createOpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: `${AIGATEWAY_BASEURL}/openai`,
  compatibility: 'strict',
})

export const openaiModel = openaiProvider('gpt-4o')

const anthropicProvider = createAnthropic({
  apiKey: CLAUDE_API_KEY,
  baseURL: `${AIGATEWAY_BASEURL}/anthropic`,
})

export const anthropicModel = anthropicProvider('claude-3-5-sonnet-20240620')

const googleAiProvider = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY,
  // baseURL: `${AIGATEWAY_BASEURL}/google-ai-studio/v1`
  // #INFO: ai-gateway for google-ai-studio is beta, so occurring error
})

export const googleAiModel = googleAiProvider('gemini-1.5-pro')

const mistralProvider = createMistral({
  apiKey: MISTRAL_API_KEY,
  baseURL: `${AIGATEWAY_BASEURL}/mistral`,
})

export const mistralModel = mistralProvider('mistral-large-latest')

export const aiModels = [openaiModel, anthropicModel, googleAiModel, mistralModel] as const
export type AiModel = (typeof aiModels)[number]

export const aiModelNames = ['gpt', 'claude', 'gemini', 'mistral'] as const
type AiModelNames = (typeof aiModelNames)[number]

export const getAiModelName = (model: string): AiModelNames => {
  if (model === openaiModel.provider) return 'gpt'
  if (model === anthropicModel.provider) return 'claude'
  if (model === googleAiModel.provider) return 'gemini'
  if (model === mistralModel.provider) return 'mistral'
  return 'gpt' // default value
}

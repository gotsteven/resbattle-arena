import { JSONParseError, TypeValidationError, generateObject } from 'ai'
import type { ZodSchema } from 'zod'
import type { AiModel } from './aiModels'

export const aiClient = {
  generateObject: async <T>(model: AiModel, schema: ZodSchema<T>, prompt: string) => {
    const { object } = await generateObject({
      model,
      schema,
      prompt,
    }).catch((error) => {
      if (error instanceof JSONParseError) {
        console.error(`JSONParseError(ai-${model.provider}):`, error.message)
      }
      if (error instanceof TypeValidationError) {
        console.error(`TypeValidationError(ai-${model.provider}):`, error.message)
      }
      throw error
    })

    return object
  },
}

import IconClaude from '../assets/icons/claude.png'
import IconGemini from '../assets/icons/gemini.png'
import IconGPT from '../assets/icons/gpt.png'
import IconMistral from '../assets/icons/mistral.png'

export const positionInfoMap = {
  agree: {
    label: '賛成',
    color: 'blue-500',
  },
  disagree: {
    label: '反対',
    color: 'red-500',
  },
} as const

export type Position = keyof typeof positionInfoMap

export const aiModelInfoMap = {
  gpt: {
    label: 'GPT',
    icon: IconGPT,
  },
  claude: {
    label: 'Claude',
    icon: IconClaude,
  },
  gemini: {
    label: 'Gemini',
    icon: IconGemini,
  },
  mistral: {
    label: 'Mistral',
    icon: IconMistral,
  },
} as const

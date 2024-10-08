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

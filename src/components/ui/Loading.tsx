import { IconLoader2 } from '@tabler/icons-react'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type LoadingProps = {
  className?: string
  iconSize?: number
}

export const Loading: FC<LoadingProps> = ({ className = '', iconSize = 24 }) => (
  <div className="flex justify-center">
    <IconLoader2 className={twMerge('animate-spin text-accent', className)} size={iconSize} />
  </div>
)

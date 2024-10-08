import type { FC, ReactNode } from 'react'
import { twJoin } from 'tailwind-merge'

type MessageProps = {
  isOwn: boolean
  children: ReactNode
}

export const Message: FC<MessageProps> = ({ isOwn, children }) => (
  <div
    className={twJoin(
      'w-fit max-w-[80%] whitespace-pre-wrap rounded-md px-4 py-2',
      !isOwn && 'bg-background-50',
      isOwn && 'text ml-auto bg-accent text-white',
    )}
  >
    {children}
  </div>
)

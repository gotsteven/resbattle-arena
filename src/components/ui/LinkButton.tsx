import type { LinkProps } from 'next/link'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkButtonProps = Omit<LinkProps, 'children'> & {
  icon: ReactNode
  className?: string
  iconPosition?: 'left' | 'right'
  label?: string
}

export const LinkButton: FC<LinkButtonProps> = ({
  className,
  label,
  iconPosition = 'left',
  icon,
  ...props
}) => (
  <Link
    {...props}
    className={twMerge(
      iconPosition === 'right' && 'flex-row-reverse',
      'flex w-fit items-center justify-center gap-x-2 rounded-md bg-background-50 p-2 transition-colors',
      'hover:bg-background-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:text-foreground-500 disabled:hover:bg-background-50',
      className,
    )}
  >
    {icon}
    {label}
  </Link>
)

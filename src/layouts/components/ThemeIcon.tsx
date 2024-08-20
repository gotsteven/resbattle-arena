'use client'

import { IconButton } from '@/components/ui/IconButton'
import { useTheme } from '@/hooks/useTheme'
import { IconMoon, IconSun } from '@tabler/icons-react'

export const ThemeIcon = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <IconButton
      icon={theme === 'dark' ? IconMoon : IconSun}
      onClick={toggleTheme}
      className="bg-transparent"
      aria-label="toggle theme"
    />
  )
}

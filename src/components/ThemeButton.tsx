'use client'

import { useTheme } from '@/hooks/useTheme'

export const ThemeIcon = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === 'light' ? '🌞' : '🌜'}
    </button>
  )
}

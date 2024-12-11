import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <IconButton 
      onClick={toggleTheme} 
      color="inherit"
      className="text-blue-600 dark:text-blue-400"
    >
      {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

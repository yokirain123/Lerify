'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import Button from './Button'


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className='flex items-center justify-center gap-3'
    >
      Theme Toggle {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </Button>
  )
}

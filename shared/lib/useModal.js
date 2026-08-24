'use client'
import { useState, useCallback } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(null)

  const open = useCallback((payload = null) => {
    setData(payload)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setData(null), 300)
  }, [])

  return { isOpen, data, open, close }
}

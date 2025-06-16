'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { ColorNamesModalProps } from '@/types/types'

function ColorNamesModal({ colors, isOpen, onClose }: ColorNamesModalProps) {
  const [colorNames, setColorNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // DEBUG: Log every render with key state info
  console.log('[ColorNamesModal] Render:', { isOpen, colors, colorNames, isLoading, isError })

  useEffect(() => {
    if (!isOpen) {
      console.log('[ColorNamesModal] Modal closed, clearing state')
      setColorNames([])
      setIsLoading(false)
      setIsError(false)
      return
    }

    if (!Array.isArray(colors) || colors.length === 0) {
      console.log('[ColorNamesModal] No colors to fetch names for.')
      setColorNames([])
      return
    }

    // We stringify colors array to create a stable dependency for useEffect
    const fetchColorNames = async () => {
      setIsLoading(true)
      setIsError(false)
      setColorNames([])

      try {
        console.log('[ColorNamesModal] Fetching color names for:', colors)
        const res = await fetch('/api/name-colors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ colors }),
        })

        if (!res.ok) throw new Error(`API error status: ${res.status}`)

        const data = await res.json()
        console.log('[ColorNamesModal] API response:', data)
        setColorNames(data.color_names)
      } catch (error) {
        console.error('[ColorNamesModal] Fetch failed:', error)
        setIsError(true)
        toast.error('Failed to generate color names')
      } finally {
        setIsLoading(false)
      }
    }

    fetchColorNames()
  }, [isOpen, JSON.stringify(colors)])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Color Names</DialogTitle>
          <DialogDescription>
            This tool uses AI to generate descriptive names for your colors. It may take a few
            seconds depending on the number of colors.
          </DialogDescription>
        </DialogHeader>

        {/* Debug UI */}
        <div className="mb-2 text-xs text-muted-foreground">
          <p>
            <b>Debug info:</b>
          </p>
          <p>Colors array length: {colors.length}</p>
          <p>Color names length: {colorNames.length}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>Error: {isError ? 'Yes' : 'No'}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <FaSpinner className="animate-spin text-xl" />
          </div>
        ) : isError ? (
          <p className="text-red-500 text-sm text-center">Failed to fetch color names.</p>
        ) : colorNames.length === colors.length ? (
          <ul className="space-y-2 mt-4">
            {colorNames.map((name, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded border"
                  style={{ backgroundColor: colors[i] }}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-center mt-4 text-muted-foreground">
            No color names available yet.
          </p>
        )}

        <DialogClose asChild>
          <button className="mt-6 w-full text-sm text-muted-foreground underline hover:text-primary">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default ColorNamesModal

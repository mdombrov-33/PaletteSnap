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

  // Debug logging on each render
  console.log('[ColorNamesModal] Render:', {
    isOpen,
    colors,
    colorNames,
    isLoading,
    isError,
  })

  useEffect(() => {
    if (!isOpen || !Array.isArray(colors) || colors.length === 0) {
      // Clear state when modal is closed or no colors
      setColorNames([])
      setIsLoading(false)
      setIsError(false)
      console.log('[ColorNamesModal] Modal closed or no colors - cleared state')
      return
    }

    async function fetchColorNames() {
      setColorNames([])
      setIsLoading(true)
      setIsError(false)

      try {
        console.log('[ColorNamesModal] Fetching color names for:', colors)
        const res = await fetch('/api/name-colors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ colors }),
        })

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`)
        }

        const data = await res.json()
        console.log('[ColorNamesModal] API response:', data)

        if (
          !data.color_names ||
          !Array.isArray(data.color_names) ||
          data.color_names.length === 0
        ) {
          throw new Error('No color names returned from API')
        }

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
  }, [isOpen, colors])

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
          // Show whatever partial or unexpected colorNames we have as JSON for debugging
          <pre className="mt-4 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
            {JSON.stringify(colorNames, null, 2)}
          </pre>
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

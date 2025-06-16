'use client'

import { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { ColorNamesModalProps } from '@/types/types'

export function ColorNamesModal({ colors, onClose }: Omit<ColorNamesModalProps, 'isOpen'>) {
  const [colorNames, setColorNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  async function fetchColorNames() {
    if (!Array.isArray(colors) || colors.length === 0) return

    setColorNames([])
    setIsLoading(true)
    setIsError(false)

    try {
      const res = await fetch('/api/name-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors }),
      })

      if (!res.ok) throw new Error('Failed to fetch color names')

      const data = await res.json()
      setColorNames(data.color_names)
    } catch (error) {
      console.error('Color name fetch failed:', error)
      setIsError(true)
      toast.error('Failed to generate color names')
    } finally {
      setIsLoading(false)
    }
  }

  // Close modal on ESC key press
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <>
      {/* Modal panel only, no background */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-md shadow-xl max-w-lg w-full p-6 text-left pointer-events-auto"
          onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside panel
          style={{
            backgroundColor: 'var(--background)',
          }}
        >
          <h2 id="modal-title" className="text-lg font-semibold text-card-foreground mb-4">
            Color Names
          </h2>

          <div className="mb-4">
            <button
              onClick={fetchColorNames}
              disabled={isLoading}
              className="text-primary underline hover:text-secondary text-sm focus:outline-none"
            >
              {isLoading ? 'Generating...' : 'Generate Color Names'}
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <FaSpinner
                className="animate-spin text-xl text-primary"
                aria-label="Loading spinner"
              />
            </div>
          ) : isError ? (
            <p className="text-destructive text-sm text-center mt-4">
              Failed to fetch color names.
            </p>
          ) : colorNames.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto text-card-foreground">
              {colorNames.map((name, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span
                    className="inline-block w-5 h-5 rounded border border-border"
                    style={{ backgroundColor: colors[i] }}
                    aria-label={`Color swatch for ${name}`}
                  />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full text-sm underline text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

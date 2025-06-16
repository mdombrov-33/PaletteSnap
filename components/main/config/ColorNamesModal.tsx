'use client'

import { useState } from 'react'

export function ColorNamesModal({ colors, onClose }: { colors: string[]; onClose: () => void }) {
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-md p-6 max-w-lg w-full shadow-lg"
          style={{ backgroundColor: 'var(--background)', backgroundImage: 'none' }}
        >
          <h2 className="text-lg font-semibold mb-4 text-card-foreground">Color Names</h2>

          <button
            onClick={fetchColorNames}
            disabled={isLoading}
            className="text-primary underline hover:text-secondary text-sm focus:outline-none mb-4"
          >
            {isLoading ? 'Generating...' : 'Generate Color Names'}
          </button>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <svg
                className="animate-spin text-primary w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading spinner"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
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

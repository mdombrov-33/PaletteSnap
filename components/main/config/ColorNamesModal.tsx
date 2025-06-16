'use client'

import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'sonner'
import { ColorNamesModalProps } from '@/types/types'

export function ColorNamesModal({ colors, isOpen, onClose }: ColorNamesModalProps) {
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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-80"
          leave="ease-in duration-200"
          leaveFrom="opacity-80"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/60" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className="w-full max-w-lg transform overflow-hidden rounded-md p-6 text-left align-middle shadow-xl ring-1 ring-border transition-all"
                style={{
                  backgroundColor: 'var(--background)',
                  backgroundImage: 'none',
                }}
              >
                <DialogTitle className="text-lg font-semibold text-card-foreground">
                  Color Names
                </DialogTitle>

                <div className="mt-4">
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
                  <ul className="space-y-2 mt-4 max-h-60 overflow-y-auto text-card-foreground">
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

'use client'

import { useState } from 'react'
import { PaletteConfigProps } from '@/types/types'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateRandomColor } from '@/utils/generate-random-colors'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { FaSpinner } from 'react-icons/fa'

function PaletteConfig({
  colors,
  onChange,
}: PaletteConfigProps & { onChange: (colors: string[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [colorNames, setColorNames] = useState<string[]>([])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingIndex === null) return
    const newColors = [...colors]
    newColors[editingIndex] = e.target.value
    onChange(newColors)
  }

  const generateRandomPalette = () => {
    const newColors = Array(colors.length)
      .fill(null)
      .map(() => generateRandomColor())
    onChange(newColors)
  }

  async function generateColorNames(colors: string[]) {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await fetch('/api/name-colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colors }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch color names')
      }
      const data = await response.json()
      setColorNames(data.color_names)
      return data
    } catch (error) {
      console.error('Error generating color names:', error)
      setIsError(true)
      toast.error('Failed to generate color names')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">Palette Config</h2>
      <p className="text-sm">Click to change colors</p>
      <p className="text-sm mt-2 italic">
        Changing any color will automatically update the assigned roles (primary, background, etc.).
      </p>
      <div className="flex flex-wrap gap-1 mt-4">
        {colors.map((color, i) => (
          <div key={i} className="relative">
            <div
              className="w-12 h-12 rounded border border-primary/40 cursor-pointer"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => setEditingIndex(i)}
            />
            {editingIndex === i && (
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                onBlur={() => setEditingIndex(null)}
                autoFocus
                className="absolute top-0 left-0 w-12 h-12 p-0 border-none cursor-pointer opacity-0"
              />
            )}
          </div>
        ))}
      </div>
      <Button
        className="mt-4"
        variant="default"
        onClick={() => {
          generateRandomPalette()
          toast.success('Generated new random palette!')
        }}
      >
        Random Palette
      </Button>
      <Button
        className="mt-4"
        variant="secondary"
        disabled={isLoading}
        onClick={() => {
          generateColorNames(colors)
        }}
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : 'Generate Color Names'}
      </Button>
      <Button
        className="mt-4"
        variant="secondary"
        onClick={() => {
          const snippet = colors.join('\n')
          navigator.clipboard.writeText(snippet)
          toast.success('Copied all colors!')
        }}
      >
        Copy All Colors
      </Button>
    </div>
  )
}

export default PaletteConfig

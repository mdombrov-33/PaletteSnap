'use client'

import { useState } from 'react'
import { PaletteConfigProps } from '@/types/types'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateRandomColor } from '@/utils/generate-random-colors'
import { ColorNamesModal } from '@/components/main/config/ColorNamesModal'

function PaletteConfig({
  colors,
  onChange,
}: PaletteConfigProps & { onChange: (colors: string[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    toast.success('Generated new random palette!')
  }

  const handleCopyColors = () => {
    const snippet = colors.join('\n')
    navigator.clipboard.writeText(snippet)
    toast.success('Copied all colors!')
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">Palette Config</h2>
      <p className="text-sm">Click to change colors</p>
      <p className="text-sm mt-2 italic">
        Changing any color will automatically update the assigned roles (primary, background, etc.).
      </p>
      <div className="flex flex-wrap gap-1 mt-4">
        {Array.isArray(colors)
          ? colors.map((color, i) => (
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
            ))
          : null}
      </div>

      <Button className="mt-4" variant="default" onClick={generateRandomPalette}>
        Random Palette
      </Button>

      <Button className="mt-4" variant="secondary" onClick={() => setIsModalOpen(true)}>
        Show Color Names
      </Button>

      <Button className="mt-4" variant="secondary" onClick={handleCopyColors}>
        Copy All Colors
      </Button>

      <ColorNamesModal colors={colors} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default PaletteConfig

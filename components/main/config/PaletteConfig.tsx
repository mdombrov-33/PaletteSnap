'use client'

import { useState } from 'react'
import { PaletteConfigProps } from '@/types/types'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

function PaletteConfig({
  colors,
  onChange,
}: PaletteConfigProps & { onChange: (colors: string[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingIndex === null) return
    const newColors = [...colors]
    newColors[editingIndex] = e.target.value
    onChange(newColors)
  }

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">Palette Config</h2>
      <p className="text-sm text-muted-foreground italic">
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

'use client'

import { useState, useEffect, useRef } from 'react'
import { PaletteConfigProps } from '@/types/types'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { generateRandomColor } from '@/utils/generate-random-colors'
import { FaSpinner } from 'react-icons/fa'

function PaletteConfig({
  colors,
  onChange,
}: PaletteConfigProps & { onChange: (colors: string[]) => void }) {
  const [colorNames, setColorNames] = useState<string[] | null>(null)
  const [isLoadingNames, setIsLoadingNames] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    onChange(newColors)
  }

  const generateRandomPalette = () => {
    const newColors = colors.map(() => generateRandomColor())
    onChange(newColors)
    toast.success('Generated new random palette!')
  }

  const handleCopyColors = () => {
    navigator.clipboard.writeText(colors.join('\n'))
    toast.success('Copied all colors!')
  }

  const fetchColorNames = async () => {
    setIsLoadingNames(true)
    try {
      const res = await fetch('/api/name-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colors }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setColorNames(data.color_names)
      toast.success('Color names generated!')
    } catch (err) {
      console.error('Error fetching color names:', err)
      toast.error('Failed to fetch color names')
      setColorNames(null)
    } finally {
      setIsLoadingNames(false)
    }
  }

  useEffect(() => {
    setColorNames(null)
  }, [colors])

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Palette Config</h2>
      <p className="text-sm text-muted-foreground">Click a swatch to edit its color</p>
      <p className="text-sm mt-2 italic text-muted-foreground">
        Changing any color will automatically update the assigned roles (primary, background, etc.).
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {colors.map((color, i) => (
          <div key={i} className="relative flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded border border-primary/40 cursor-pointer shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => inputRefs.current[i]?.click()}
              aria-label={`Color swatch ${i + 1}`}
              role="button"
            />
            <input
              type="color"
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
              className="absolute top-0 left-0 w-12 h-12 opacity-0 pointer-events-none"
              aria-hidden="true"
              tabIndex={-1}
            />
            {colorNames?.[i] && (
              <span className="text-xs text-muted-foreground text-center max-w-[3rem]">
                {colorNames[i]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <Button variant="secondary" onClick={generateRandomPalette}>
          Random Palette
        </Button>

        <Button variant="secondary" onClick={fetchColorNames} disabled={isLoadingNames}>
          {isLoadingNames ? <FaSpinner className="animate-spin" /> : 'Generate Color Names'}
        </Button>

        <Button variant="secondary" onClick={handleCopyColors}>
          Copy All Colors
        </Button>
      </div>
    </div>
  )
}

export default PaletteConfig

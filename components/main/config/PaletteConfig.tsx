import { PaletteConfigProps } from '@/types/types'

function PaletteConfig({ colors }: PaletteConfigProps) {
  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-lg font-semibold">Palette Config</h2>
      <div className="flex flex-wrap gap-1">
        {colors.map((color, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded border border-primary/40"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default PaletteConfig

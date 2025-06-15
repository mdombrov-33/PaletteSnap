import { cn } from '@/lib/utils'
import { ExportFormat } from '@/types/enums'
import { PaletteConfigProps } from '@/types/types'
import { getSnippet } from '@/utils/get-export-snippet'
import { useState } from 'react'

function ExportConfig({ colors }: PaletteConfigProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(ExportFormat.Tailwind)
  const formats = Object.values(ExportFormat)
  const snippet = getSnippet(selectedFormat, colors)

  return (
    <div className="w-full lg:col-span-2 border border-border rounded-xl p-4 space-y-4 bg-card text-card-foreground">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => setSelectedFormat(format)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium border border-border whitespace-nowrap transition-colors',
              format === selectedFormat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground hover:bg-secondary/20'
            )}
          >
            {format}
          </button>
        ))}
      </div>

      {/* Snippet Box */}
      <pre className="bg-background border border-border text-foreground text-sm p-4 rounded-md overflow-auto">
        <code className="whitespace-pre-wrap break-words">{snippet}</code>
      </pre>
    </div>
  )
}

export default ExportConfig

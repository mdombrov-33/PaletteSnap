import { Button } from '@/components/ui/button'
import { ExportFormat } from '@/types/enums'
import { FullColorRoles } from '@/types/types'
import { getSnippet } from '@/utils/get-export-snippet'
import { useState } from 'react'
import { toast } from 'sonner'

function ExportConfig({ roles }: { roles: FullColorRoles }) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(ExportFormat.Tailwind)
  const formats = Object.values(ExportFormat)
  const snippet = getSnippet(selectedFormat, roles)

  return (
    <div className="w-full lg:col-span-2 border border-border rounded-xl p-4 space-y-4 bg-card text-card-foreground">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2">
        {formats.map((format) => (
          <Button
            key={format}
            onClick={() => setSelectedFormat(format)}
            variant={format === selectedFormat ? 'default' : 'outline'}
            className="px-3 py-1.5 text-sm font-medium whitespace-nowrap"
          >
            {format}
          </Button>
        ))}
      </div>

      {/* Snippet Box */}
      <pre className="bg-background border border-border text-foreground text-sm p-4 rounded-md overflow-auto">
        <code className="whitespace-pre-wrap break-words">{snippet}</code>
      </pre>
      <Button
        variant="default"
        className="w-full mt-2"
        onClick={() => {
          navigator.clipboard.writeText(snippet)
          toast.success('Copied snippet!')
        }}
      >
        Copy Snippet
      </Button>
    </div>
  )
}

export default ExportConfig

import React from 'react'
import { getContrastRatio } from '@/utils/color-contrast/color-contrast'
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

function ColorContrastCheck({
  colors,
  backgroundColor = '#ffffff',
  minContrast = 4.5,
}: {
  colors: { label: string; color: string }[]
  backgroundColor?: string
  minContrast?: number
}) {
  return (
    <div className="w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Accessibility Check</h2>
      <p className="max-w-md text-sm mb-4">
        This check compares each foreground color against the background color{' '}
        <span
          className="inline-block w-6 h-6 align-middle rounded border border-border"
          style={{ backgroundColor }}
          title={`Background color: ${backgroundColor}`}
        />{' '}
        to ensure sufficient contrast for readability. Colors with a contrast ratio of at least{' '}
        <strong>{minContrast}</strong> pass the WCAG AA standard for normal text.
      </p>
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-3 items-center">
        {colors.map(({ label, color }, i) => {
          const contrast = getContrastRatio(color, backgroundColor)
          const passes = contrast >= minContrast
          return (
            <React.Fragment key={i}>
              {/* Label + Color Box */}
              <div className="flex items-center space-x-2">
                <span>{label}</span>
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              </div>
              {/* Spacer */}
              <div />
              {/* Status */}
              <div
                className={cn(
                  'flex items-center gap-2 font-semibold',
                  passes ? 'text-green-600' : 'text-red-600'
                )}
              >
                {!passes && <AlertTriangle className="w-4 h-4" aria-hidden />}
                {passes ? 'Pass' : 'Fail'} ({contrast.toFixed(2)})
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default ColorContrastCheck

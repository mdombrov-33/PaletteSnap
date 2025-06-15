import React from 'react'
import { getContrastRatio } from '@/utils/color-contrast/color-contrast'
import { ColorContrastCheckProps } from '@/types/types'
import { cn } from '@/lib/utils'

export function ColorContrastCheck({
  colors,
  backgroundColor = '#ffffff',
  minContrast = 4.5,
}: ColorContrastCheckProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Accessibility Check</h2>
      <p className="max-w-md text-sm">
        This check compares each foreground color against the background color{' '}
        <span
          className="inline-block w-6 h-6 align-middle rounded border border-border"
          style={{ backgroundColor }}
          title={`Background color: ${backgroundColor}`}
        />{' '}
        to ensure sufficient contrast for readability. Colors with a contrast ratio of at least{' '}
        <strong>{minContrast}</strong> pass the WCAG AA standard for normal text.
      </p>
      <div className="flex flex-wrap gap-4">
        {colors.map((color, i) => {
          const contrast = getContrastRatio(color, backgroundColor)
          const passes = contrast >= minContrast
          return (
            <div key={i} className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: color }}
                title={`Contrast ratio: ${contrast.toFixed(2)}`}
              />
              <span
                className={cn(!passes ? 'text-destructive' : 'text-foreground', 'font-semibold')}
              >
                {passes ? 'Pass' : 'Fail'}
              </span>
              <span className="text-sm">{contrast.toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { useImageColor } from '@/hooks/useImageColor'
import UploadSection from './upload/UploadSection'
import { cn } from '@/lib/utils'
import PaletteConfig from './config/PaletteConfig'
import LivePreview from './config/LivePreview'
import ExportConfig from './config/ExportConfig'
import ColorContrastCheck from './config/ColorContrastCheck'
import { getSmartColorRoles } from '@/utils/color-utils'
import { useEffect, useState } from 'react'
import { FullColorRoles } from '@/types/types'

const DEFAULT_ROLES: FullColorRoles = {
  primary: '#1e40af',
  background: '#ffffff',
  foreground: ['#000000', '#333333', '#666666'],
}

function PaletteEditorPage() {
  const { handleFileChange, colors: extractedColors } = useImageColor()
  const [rawColors, setRawColors] = useState<string[]>([])
  const [colorRoles, setColorRoles] = useState<FullColorRoles>(DEFAULT_ROLES)

  // On new extraction, update rawColors immediately
  useEffect(() => {
    if (extractedColors.length > 0) {
      setRawColors(extractedColors)
    }
  }, [extractedColors])

  // When rawColors change (including manual edits), recalc colorRoles
  useEffect(() => {
    if (rawColors.length > 0) {
      const roles = getSmartColorRoles(rawColors)
      setColorRoles(roles)
    } else {
      setColorRoles(DEFAULT_ROLES)
    }
  }, [rawColors])

  return (
    <main
      className={cn(
        'flex-1 flex flex-col justify-center items-center',
        rawColors.length > 0 ? 'justify-start pt-10 mt-6' : 'justify-center'
      )}
    >
      <UploadSection handleFileChange={handleFileChange} />

      {rawColors.length > 0 && (
        <section className="md:mt-22 mt-20 mx-auto w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <PaletteConfig colors={rawColors} onChange={setRawColors} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <ColorContrastCheck
              backgroundColor={colorRoles.background}
              colors={[
                { label: 'Primary', color: colorRoles.primary },
                ...colorRoles.foreground.map((c, i) => ({
                  label: `Foreground ${i + 1}`,
                  color: c,
                })),
              ]}
            />
          </div>

          <div className="lg:col-span-3">
            <LivePreview
              primary={colorRoles.primary}
              foreground={colorRoles.foreground}
              background={colorRoles.background}
            />
          </div>

          <div className="lg:col-span-4">
            <ExportConfig roles={colorRoles} />
          </div>
        </section>
      )}
    </main>
  )
}

export default PaletteEditorPage

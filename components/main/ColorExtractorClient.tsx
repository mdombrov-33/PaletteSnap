'use client'

import { useImageColor } from '@/hooks/useImageColor'
import UploadSection from './upload/UploadSection'
import { cn } from '@/lib/utils'
import PaletteConfig from './config/PaletteConfig'
import LivePreview from './config/LivePreview'
import ExportConfig from './config/ExportConfig'
import { ColorContrastCheck } from './config/ColorContrastCheck'
import { getSmartColorRoles } from '@/utils/color-utils'

export default function ColorExtractorClient() {
  const { handleFileChange, colors } = useImageColor()
  const { background, foreground, primary } = getSmartColorRoles(colors)

  return (
    <main
      className={cn(
        'flex-1 flex flex-col justify-center items-center',
        colors.length > 0 ? 'justify-start pt-10 mt-6' : 'justify-center'
      )}
    >
      <UploadSection handleFileChange={handleFileChange} />

      {colors.length > 0 && (
        <section className="mt-36 mx-auto w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <PaletteConfig colors={colors} />
          </div>

          <div className="lg:col-span-2">
            <ColorContrastCheck backgroundColor={background} colors={colors} />
          </div>

          <div className="lg:col-span-3">
            <LivePreview primary={primary} foreground={foreground} background={background} />
          </div>

          <div className="lg:col-span-5">
            <ExportConfig colors={colors} />
          </div>
        </section>
      )}
    </main>
  )
}

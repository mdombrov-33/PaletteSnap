'use client'

import { useImageColor } from '@/hooks/useImageColor'
import UploadSection from './upload/UploadSection'
import { cn } from '@/lib/utils'
import PaletteConfig from './config/PaletteConfig'
import LivePreview from './config/LivePreview'
import ExportConfig from './config/ExportConfig'

export default function ColorExtractorClient() {
  const { handleFileChange, colors } = useImageColor()

  return (
    <main
      className={cn(
        'flex-1 flex flex-col justify-center items-center',
        colors.length > 0 ? 'justify-start pt-10 mt-6' : 'justify-center'
      )}
    >
      <UploadSection handleFileChange={handleFileChange} />

      {colors.length > 0 && (
        <section className="mt-44 mx-auto grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-24 w-full max-w-7xl px-4">
          {/* Palette Config */}
          <div className="col-span-2">
            <PaletteConfig colors={colors} />
          </div>

          {/* Accessibility Checks */}
          <div className="col-span-1">
            <div>Accessibility Checks UI</div>
          </div>

          {/* Live Preview */}
          <div className="col-span-3">
            <LivePreview colors={colors} />
          </div>

          {/* Export */}
          <div className="col-span-4">
            <ExportConfig colors={colors} />
          </div>
        </section>
      )}
    </main>
  )
}

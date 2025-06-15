'use client'

import { useImageColor } from '@/hooks/useImageColor'
import UploadSection from './upload/UploadSection'
import { cn } from '@/lib/utils'
import PaletteConfig from './config/PaletteConfig'
import LivePreview from './config/LivePreview'

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
        <section className="mt-44 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-24 w-full max-w-7xl px-4">
          {/* Palette Config */}
          <PaletteConfig colors={colors} />

          {/* Accessibility Checks */}
          <div>Accessibility Checks UI</div>

          {/* Live Preview */}
          <LivePreview colors={colors} />

          {/* Export / Other */}
          <div>Export / Other UI</div>
        </section>
      )}
    </main>
  )
}

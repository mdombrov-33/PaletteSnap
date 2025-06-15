'use client'

import { useImageColor } from '@/hooks/useImageColor'
import UploadSection from './UploadSection'

export default function ColorExtractorClient() {
  const { handleFileChange, colors } = useImageColor()

  return (
    <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
      <UploadSection handleFileChange={handleFileChange} />

      {/* Temporary for debugging — replace later with conditionally revealed components */}
      {colors.length > 0 && (
        <div className="mt-6 text-sm text-muted-foreground">
          Extracted colors: {colors.join(', ')}
        </div>
      )}
    </div>
  )
}

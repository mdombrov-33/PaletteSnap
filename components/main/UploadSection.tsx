'use client'

import { HandleFileChangeProps } from '@/types'
import UploadButton from './UploadButton'

export default function UploadSection({ handleFileChange }: HandleFileChangeProps) {
  return (
    <section className="w-full flex justify-center">
      <UploadButton handleFileChange={handleFileChange} />
    </section>
  )
}

'use client'

import { HandleFileChangeProps } from '@/types/types'
import UploadButton from './UploadButton'

export default function UploadSection({ handleFileChange }: HandleFileChangeProps) {
  return (
    <section className="w-full flex justify-center px-8 lg:px-0">
      <UploadButton handleFileChange={handleFileChange} />
    </section>
  )
}

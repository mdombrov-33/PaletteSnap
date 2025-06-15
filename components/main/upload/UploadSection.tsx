'use client'

import React, { useState, useRef, DragEvent } from 'react'
import { HandleFileChangeProps } from '@/types/types'
import UploadButton from './UploadButton'
import { cn } from '@/lib/utils'

export default function UploadSection({ handleFileChange }: HandleFileChangeProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current += 1
    setIsDragging(true)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current -= 1
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    dragCounter.current = 0

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const fakeEvent = {
        target: {
          files,
        },
      } as React.ChangeEvent<HTMLInputElement>
      handleFileChange(fakeEvent)
    }
  }

  return (
    <section
      className={cn(
        'w-full max-w-md flex justify-center px-8 lg:px-0 transition-colors duration-200',
        isDragging && 'bg-primary/70'
      )}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <UploadButton handleFileChange={handleFileChange} />
    </section>
  )
}

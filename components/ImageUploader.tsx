'use client'

import React, { useState, useEffect } from 'react'
import { useImageColor } from '@/hooks/useImageColor'

function ImageUploader() {
  const { colors, handleFileChange } = useImageColor()

  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
  }

  useEffect(() => {
    if (!copiedColor) return
    const timeout = setTimeout(() => setCopiedColor(null), 2000)
    return () => clearTimeout(timeout)
  }, [copiedColor])

  return (
    <div className="">
      {/* Upload Button */}
      <label htmlFor="image-upload" className="cursor-pointer">
        Upload Image
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default ImageUploader

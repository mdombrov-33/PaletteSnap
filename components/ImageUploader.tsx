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
    <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-lg flex flex-col items-center">
      {/* Upload Button */}
      <label
        htmlFor="image-upload"
        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-lg transition select-none"
      >
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

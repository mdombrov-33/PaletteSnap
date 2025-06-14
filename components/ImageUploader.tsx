'use client'

import React, { useState, useEffect } from 'react'
import { useImageColor } from '@/hooks/useImageColor'

function ImageUploader() {
  const { colors, handleFileChange } = useImageColor()

  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [copiedSnippet, setCopiedSnippet] = useState(false)

  function handleCopy(color: string) {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
  }

  function handleCopySnippet() {
    navigator.clipboard.writeText(generateCssVariables(colors))
    setCopiedSnippet(true)
    setTimeout(() => setCopiedSnippet(false), 2000)
  }

  useEffect(() => {
    if (!copiedColor) return
    const timeout = setTimeout(() => setCopiedColor(null), 2000)
    return () => clearTimeout(timeout)
  }, [copiedColor])

  function generateCssVariables(colors: string[]) {
    return `:root {\n${colors.map((color, idx) => `  --color-${idx + 1}: ${color};`).join('\n')}\n}`
  }

  return (
    <div className="max-w-sm w-full p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-xl flex flex-col items-center justify-center">
      <label
        htmlFor="image-upload"
        className="cursor-pointer text-center px-6 py-3 text-white text-lg font-semibold hover:bg-white/20 transition rounded"
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

      <div className="mt-6 flex space-x-4">
        {colors.map((color) => (
          <div
            key={color}
            className="relative w-12 h-12 rounded-lg shadow-md cursor-pointer"
            style={{ backgroundColor: color }}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={() => handleCopy(color)}
            title={color}
          >
            {hoveredColor === color && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded select-none pointer-events-none">
                {color}
              </div>
            )}

            {copiedColor === color && (
              <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded select-none pointer-events-none">
                Copied!
              </div>
            )}
          </div>
        ))}
      </div>

      {colors.length > 0 && (
        <div className="mt-6 w-full">
          <pre className="bg-black bg-opacity-60 p-4 rounded text-xs text-green-400 whitespace-pre-wrap font-mono max-h-48 overflow-auto">
            {generateCssVariables(colors)}
          </pre>
          <button
            className="mt-2 w-full bg-green-600 hover:bg-green-700 transition rounded py-2 text-white font-semibold"
            onClick={handleCopySnippet}
          >
            {copiedSnippet ? 'Copied!' : 'Copy CSS snippet'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUploader

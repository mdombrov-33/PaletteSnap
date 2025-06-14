'use client'

import { useImageColor } from '@/hooks/useImageColor'

function ImageUploader() {
  const { colors, handleFileChange } = useImageColor()

  return (
    <div className="max-w-sm w-full p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-xl flex flex-col items-center justify-center">
      <label
        htmlFor="image-upload"
        className="cursor-pointer flex items-center justify-center text-center px-6 py-3 text-white text-lg font-semibold hover:bg-white/20 transition rounded w-52"
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
            className="w-12 h-12 rounded-lg shadow-md cursor-pointer"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageUploader

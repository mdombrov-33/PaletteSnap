import { HandleFileChangeProps } from '@/types/types'
import { Upload } from 'lucide-react'

function UploadButton({ handleFileChange }: HandleFileChangeProps) {
  return (
    <label
      htmlFor="image-upload"
      className="flex flex-col items-center justify-center w-full max-w-md px-6 py-10 border-2 border-dashed border-primary rounded-xl cursor-pointer transition-colors hover:bg-primary/5 focus-within:ring-2 focus-within:ring-ring"
    >
      <Upload className="w-8 h-8 mb-3 text-primary" aria-hidden="true" />
      <span className="text-sm text-foreground text-center font-medium">
        Click or drag an image here to extract colors
      </span>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  )
}

export default UploadButton

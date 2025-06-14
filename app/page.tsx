import DarkMode from '@/components/DarkMode'
import ImageUploader from '@/components/ImageUploader'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <DarkMode />
      <ImageUploader />
    </div>
  )
}

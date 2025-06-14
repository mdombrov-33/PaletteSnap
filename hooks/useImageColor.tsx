import { useState } from 'react'
import { Vibrant } from 'node-vibrant/browser'

export function useImageColor() {
  const [colors, setColors] = useState<string[]>([])

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return

    const file = event.target.files[0]
    const imgURL = URL.createObjectURL(file)

    try {
      const palette = await Vibrant.from(imgURL).getPalette()
      const swatches = Object.values(palette)
        .filter((swatch) => swatch !== null)
        .slice(0, 5)
        .map((swatch) => swatch.hex)

      setColors(swatches)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error processing image:', error.message)
        return
      }
    }
  }

  return { colors, handleFileChange }
}

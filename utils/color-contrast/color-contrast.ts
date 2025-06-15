// Convert hex color to RGB [r, g, b] in 0..1 range
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '')
  const bigint = parseInt(cleanHex, 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return [r, g, b]
}

// Convert sRGB to linear RGB
function srgbToLinear(c: number) {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

// Calculate relative luminance (0..1)
function luminance([r, g, b]: [number, number, number]): number {
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

// Calculate contrast ratio between two hex colors
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = luminance(hexToRgb(hex1))
  const lum2 = luminance(hexToRgb(hex2))
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

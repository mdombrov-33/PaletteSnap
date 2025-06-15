import { FullColorRoles } from '@/types/types'

export function hexToLuminance(hex: string): number {
  const [r, g, b] = hex
    .replace('#', '')
    .match(/.{2}/g)!
    .map((c) => parseInt(c, 16) / 255)

  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}
export function getSmartColorRoles(colors: string[]): FullColorRoles {
  // Sort colors by luminance descending (brightest first)
  const sorted = [...colors].sort((a, b) => hexToLuminance(b) - hexToLuminance(a))

  // Pick top 3 brightest for foreground
  const foreground = sorted.slice(0, 3)

  // Pick middle for primary
  const primary = sorted[Math.floor(sorted.length / 2)] || '#1e40af'

  // Pick darkest for background
  const background = sorted[sorted.length - 1] || '#ffffff'

  return { primary, background, foreground }
}

export function getReadableTextColor(hex: string): string {
  return hexToLuminance(hex) > 0.5 ? '#000000' : '#ffffff'
}

export function isLight(color: string) {
  const c = color.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance > 186
}

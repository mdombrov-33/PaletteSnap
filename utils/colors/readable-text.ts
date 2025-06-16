import { hexToLuminance } from './luminance'

// This is a quick helper to decide whether black or white text will be more readable on top of a given color
export function getReadableTextColor(hex: string): string {
  // If luminance is high (bright background), return black text; else return white text
  return hexToLuminance(hex) > 0.5 ? '#000000' : '#ffffff'
}

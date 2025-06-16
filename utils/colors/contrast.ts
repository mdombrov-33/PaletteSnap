// Turns a hex color string (like '#ff00aa') into normalized RGB values [r, g, b] between 0 and 1
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '') // get rid of the '#'
  const bigint = parseInt(cleanHex, 16) // parse hex string into a number
  // extract each color channel by bit-shifting, then normalize to 0-1
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255
  return [r, g, b] // return the RGB array
}

// Converts sRGB value to linear RGB — this makes the brightness calculation more accurate
function srgbToLinear(c: number) {
  // simple formula: if the value is low, scale down; else apply gamma correction curve
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

// Calculates relative luminance from an RGB triplet — tells us how bright a color really is to human eyes
function luminance([r, g, b]: [number, number, number]): number {
  // convert each channel to linear first
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  // then combine with human eye sensitivity weights
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

// This calculates contrast ratio between two colors (both in hex format)
// Used for checking accessibility — higher ratio means better readability between foreground & background
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = luminance(hexToRgb(hex1)) // luminance of first color
  const lum2 = luminance(hexToRgb(hex2)) // luminance of second color
  const lighter = Math.max(lum1, lum2) // figure out which one is lighter
  const darker = Math.min(lum1, lum2) // and which one is darker
  // formula for contrast ratio, adding 0.05 to avoid division by zero etc
  return (lighter + 0.05) / (darker + 0.05)
}

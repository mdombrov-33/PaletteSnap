// This function takes a hex color string like '#aabbcc' and calculates its luminance value
// Luminance is basically how bright the color *feels* to our eyes, from 0 (dark) to 1 (bright)
export function hexToLuminance(hex: string): number {
  // First, strip the '#' and split into RGB pairs, then convert each pair from hex to decimal 0-1 scale
  const [r, g, b] = hex
    .replace('#', '')
    .match(/.{2}/g)! // split into ["aa", "bb", "cc"]
    .map((c) => parseInt(c, 16) / 255)

  // Now we apply a gamma correction curve to get a more accurate brightness value for each channel
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))

  // Finally, combine the three adjusted channels into one luminance number with human-eye-weighted coefficients
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

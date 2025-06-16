// Another function to check if a color is light based on a simpler formula
export function isLight(color: string) {
  // Remove '#' from color string
  const c = color.substring(1)
  // Convert hex to integer number representing RGB
  const rgb = parseInt(c, 16)
  // Extract red, green, blue channels by bit-shifting
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  // Calculate a weighted sum approximating perceived brightness
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  // Return true if luminance is greater than 186 (arbitrary threshold for "light")
  return luminance > 186
}

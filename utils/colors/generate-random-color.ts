// This helper just spits out a random hex color code every time we call it
export const generateRandomColor = (): string => {
  // Generate a random number between 0 and 0xffffff (that’s the max hex color)
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
  // Make sure it’s always 6 characters long by padding with zeros if needed,
  // then add the '#' so it looks like a proper CSS color code
  return `#${randomHex.padStart(6, '0')}`
}

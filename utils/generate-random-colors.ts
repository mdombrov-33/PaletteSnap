export const generateRandomColor = (): string => {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
  return `#${randomHex.padStart(6, '0')}`
}

export interface HandleFileChangeProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PaletteConfigProps {
  colors: string[]
}

export interface LivePreviewProps {
  primary: string
  foreground: string
  background: string
}

export interface ColorContrastCheckProps extends PaletteConfigProps {
  backgroundColor?: string
  minContrast?: number
}

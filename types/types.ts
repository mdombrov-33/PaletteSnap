export interface HandleFileChangeProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PaletteConfigProps {
  colors: string[]
}

// This is the raw full color roles with multiple foregrounds as array
export interface FullColorRoles {
  primary: string
  background: string
  foreground: string[] // array of 3 foreground colors
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LivePreviewProps extends FullColorRoles {}

export interface ColorContrastCheckProps extends PaletteConfigProps {
  backgroundColor?: string
  minContrast?: number
}

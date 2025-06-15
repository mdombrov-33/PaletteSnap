import { ThemeProvider } from '@/app/theme-provider'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'PaletteSnap — Extract Color Palettes from Images',
  description:
    'PaletteSnap is a free online tool that extracts beautiful color palettes from your uploaded images. Quickly generate Tailwind, CSS, or JSON-friendly palettes.',
  keywords: [
    'color palette generator',
    'extract colors from image',
    'palette from photo',
    'Tailwind color palette',
    'PaletteSnap',
    'image color analyzer',
    'color picker from image',
    'hex color extractor',
    'color palette tool',
  ],
  metadataBase: new URL('https://palette-snap-rho.vercel.app'),
  openGraph: {
    title: 'PaletteSnap — Extract Color Palettes from Images',
    description:
      'PaletteSnap is a powerful and beautiful tool to extract color palettes from your uploaded images. Export as Tailwind, CSS, JSON, or copy colors to clipboard.',
    url: 'https://palette-snap-rho.vercel.app',
    siteName: 'PaletteSnap',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PaletteSnap color palette preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaletteSnap — Extract Color Palettes from Images',
    description:
      'Upload an image and instantly get a beautiful color palette. Copy hex codes, check contrast, and export in multiple formats.',
    images: ['/og-image.png'],
  },
  authors: [{ name: 'Maksym Dombrov', url: 'https://github.com/mdombrov-33' }],
  creator: 'Maksym Dombrov',
  themeColor: '#6d6bc1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

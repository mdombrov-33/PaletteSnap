import ColorExtractorClient from '@/components/main/PaletteEditorPage'
import Footer from '@/components/footer/Footer'
import Topbar from '@/components/topbar/Topbar'

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <nav className="shrink-0">
        <Topbar />
      </nav>

      {/* Main content */}
      <ColorExtractorClient />

      {/* Footer */}
      <Footer />
    </div>
  )
}

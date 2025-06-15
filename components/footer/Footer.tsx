import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '../ui/button'

function Footer() {
  return (
    <footer className="shrink-0 text-center text-sm py-2 text-foreground">
      <Button asChild variant="link" className="text-primary hover:text-foreground">
        <Link
          href="https://github.com/mdombrov-33/PaletteSnap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="inline mr-2" />
          PaletteSnap GitHub
        </Link>
      </Button>
    </footer>
  )
}

export default Footer

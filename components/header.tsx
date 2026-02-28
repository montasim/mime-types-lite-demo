import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>mime-types-lite</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.npmjs.com/package/mime-types-lite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              npm
            </Link>
            <Link
              href="https://github.com/montasim/mime-types-lite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
            <Button asChild>
              <Link href="/demo">
                Try Demo
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

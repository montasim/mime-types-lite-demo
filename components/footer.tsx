import Link from 'next/link';
import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>mime-types-lite</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Developed by{' '}
            <Link
              href="https://github.com/montasim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Montasim
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

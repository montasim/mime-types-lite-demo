'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Package, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>mime-types-lite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t pt-4 md:hidden">
            <Link
              href="https://www.npmjs.com/package/mime-types-lite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              npm
            </Link>
            <Link
              href="https://github.com/montasim/mime-types-lite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </Link>
            <Button asChild className="w-full">
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                Try Demo
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

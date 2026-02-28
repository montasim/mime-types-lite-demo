'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, FileCode, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MimeLookupDemo, ExtensionDemo, CodeBlock } from '@/components/mime';
import mimeTypesLite from 'mime-types-lite';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'lookup' | 'extension' | 'browse'>('lookup');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              Interactive Playground
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Try mime-types-lite directly in your browser
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border bg-muted p-1">
              <Button
                variant={activeTab === 'lookup' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('lookup')}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                MIME Lookup
              </Button>
              <Button
                variant={activeTab === 'extension' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('extension')}
                className="gap-2"
              >
                <FileCode className="h-4 w-4" />
                Extension Lookup
              </Button>
              <Button
                variant={activeTab === 'browse' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('browse')}
                className="gap-2"
              >
                <List className="h-4 w-4" />
                Browse All
              </Button>
            </div>
          </div>

          {/* Demo Components */}
          <div className="grid gap-8">
            {activeTab === 'lookup' && (
              <>
                <MimeLookupDemo />
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">How it works</h3>
                  <CodeBlock
                    code={`import mimeTypesLite from 'mime-types-lite';

// Create extension mapping
const extensionMap: Record<string, string> = {
  'html': mimeTypesLite.HTML,
  'css': mimeTypesLite.CSS,
  'js': mimeTypesLite.JS,
  'png': mimeTypesLite.PNG,
  'pdf': mimeTypesLite.PDF,
};

// Lookup function
function getMimeType(extension: string): string | undefined {
  return extensionMap[extension.toLowerCase()];
}

getMimeType('html');  // 'text/html'
getMimeType('PNG');   // 'image/png'`}
                    title="Example Usage"
                  />
                </div>
              </>
            )}

            {activeTab === 'extension' && (
              <>
                <ExtensionDemo />
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-semibold mb-4">How it works</h3>
                  <CodeBlock
                    code={`import mimeTypesLite from 'mime-types-lite';

// Create MIME to extension mapping
const mimeToExt: Record<string, string> = {
  [mimeTypesLite.HTML]: 'html',
  [mimeTypesLite.CSS]: 'css',
  [mimeTypesLite.JS]: 'js',
  [mimeTypesLite.PNG]: 'png',
  [mimeTypesLite.PDF]: 'pdf',
};

// Lookup function
function getExtension(mimeType: string): string | undefined {
  return mimeToExt[mimeType.toLowerCase()];
}

getExtension('text/html');     // 'html'
getExtension('image/png');     // 'png'`}
                    title="Example Usage"
                  />
                </div>
              </>
            )}

            {activeTab === 'browse' && (
              <div className="rounded-lg border bg-card">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">All Available MIME Types</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete list of MIME types provided by mime-types-lite
                  </p>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Constant</th>
                        <th className="px-4 py-3 text-left font-medium">MIME Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {Object.entries(mimeTypesLite).map(([key, value]) => (
                        <tr key={key} className="hover:bg-muted/50">
                          <td className="px-4 py-3 font-mono text-primary">{key}</td>
                          <td className="px-4 py-3 font-mono">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* API Reference */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              API Reference
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-2">Default Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Import the MIME types object
                </p>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

console.log(mimeTypesLite.HTML);
// → 'text/html'

console.log(mimeTypesLite.PNG);
// → 'image/png'`}
                />
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-2">TypeScript Type</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Type-safe MIME type references
                </p>
                <CodeBlock
                  code={`import { type MimeType } from 'mime-types-lite';

const types: MimeType[] = [
  'HTML',
  'CSS',
  'PNG',
  'JPEG',
];

// TypeScript will error for invalid types
const invalid: MimeType = 'INVALID'; 
// ❌ Type error`}
                />
              </div>
            </div>
          </div>

          {/* Common MIME Types Table */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              Common MIME Types
            </h2>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Extension</th>
                    <th className="px-4 py-3 text-left font-medium">MIME Type</th>
                    <th className="px-4 py-3 text-left font-medium">Constant</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { ext: '.html', mime: 'text/html', constant: 'HTML' },
                    { ext: '.css', mime: 'text/css', constant: 'CSS' },
                    { ext: '.js', mime: 'application/javascript', constant: 'JS' },
                    { ext: '.json', mime: 'application/json', constant: 'JSON' },
                    { ext: '.png', mime: 'image/png', constant: 'PNG' },
                    { ext: '.jpg, .jpeg', mime: 'image/jpeg', constant: 'JPG/JPEG' },
                    { ext: '.gif', mime: 'image/gif', constant: 'GIF' },
                    { ext: '.svg', mime: 'image/svg+xml', constant: 'SVG' },
                    { ext: '.pdf', mime: 'application/pdf', constant: 'PDF' },
                    { ext: '.mp4', mime: 'video/mp4', constant: 'MP4' },
                    { ext: '.mp3', mime: 'audio/mpeg', constant: 'MP3' },
                    { ext: '.woff', mime: 'font/woff', constant: 'WOFF' },
                    { ext: '.woff2', mime: 'font/woff2', constant: 'WOFF2' },
                    { ext: '.xml', mime: 'application/xml', constant: 'XML' },
                    { ext: '.zip', mime: 'application/zip', constant: 'ZIP' },
                  ].map((row) => (
                    <tr key={row.ext} className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-mono">{row.ext}</td>
                      <td className="px-4 py-3 font-mono">{row.mime}</td>
                      <td className="px-4 py-3 font-mono text-primary">{row.constant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

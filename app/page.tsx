import Link from 'next/link';
import { ArrowRight, Zap, Shield, Layers, Code2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FeatureCard, CodeBlock, InstallationTabs } from '@/components/mime';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Lightweight MIME Type Definitions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              A minimal, type-safe collection of common MIME types for Node.js and browser applications.
              Zero dependencies, full TypeScript support.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/demo">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://www.npmjs.com/package/mime-types-lite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on npm
                </Link>
              </Button>
            </div>

            {/* Install Command */}
            <div className="mx-auto mt-12 max-w-md">
              <InstallationTabs />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Features</h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need for MIME type handling in a lightweight package
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Direct object access with zero computation overhead"
              />
              <FeatureCard
                icon={Shield}
                title="Type Safe"
                description="Full TypeScript support with MimeType type definition"
              />
              <FeatureCard
                icon={Layers}
                title="Lightweight"
                description="Tiny bundle size, zero dependencies"
              />
              <FeatureCard
                icon={Code2}
                title="Universal"
                description="Works in Node.js and browsers"
              />
            </div>
          </div>
        </section>

        {/* API Overview */}
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              Simple API
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Import MIME Types</h3>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

// Access MIME types as constants
mimeTypesLite.HTML;        // 'text/html'
mimeTypesLite.CSS;         // 'text/css'
mimeTypesLite.JS;          // 'application/javascript'
mimeTypesLite.PNG;         // 'image/png'
mimeTypesLite.PDF;         // 'application/pdf'
mimeTypesLite.JSON;        // 'application/json'`}
                  title="Basic Usage"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">TypeScript Support</h3>
                <CodeBlock
                  code={`import mimeTypesLite, { type MimeType } from 'mime-types-lite';

// Type-safe MIME type references
const supportedTypes: MimeType[] = [
  'HTML',
  'CSS',
  'PNG',
  'JPEG',
  'PDF',
];

// Get MIME type string with type safety
const mimeType: string = mimeTypesLite[supportedTypes[0]];
// → 'text/html'`}
                  title="TypeScript Usage"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Create Lookup Functions</h3>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

// Create extension to MIME mapping
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
                  title="Custom Lookup"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Use Cases</h2>
              <p className="mt-4 text-muted-foreground">
                Common scenarios where mime-types-lite shines
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">File Upload Validation</h3>
                </div>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

const ALLOWED_MIME_TYPES = [
  mimeTypesLite.JPG,
  mimeTypesLite.PNG,
  mimeTypesLite.PDF,
];

function validateUpload(file: File) {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
}`}
                  language="typescript"
                />
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Static File Server</h3>
                </div>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';
import http from 'http';
import fs from 'fs';

const EXTENSION_MAP: Record<string, string> = {
  'html': mimeTypesLite.HTML,
  'css': mimeTypesLite.CSS,
  'js': mimeTypesLite.JS,
  'png': mimeTypesLite.PNG,
};

http.createServer((req, res) => {
  const ext = req.url!.split('.').pop()!;
  const mimeType = EXTENSION_MAP[ext];
  
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  
  fs.createReadStream(req.url!).pipe(res);
});`}
                  language="typescript"
                />
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Content-Type Headers</h3>
                </div>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

async function sendFile(res: Response, filePath: string) {
  const ext = filePath.split('.').pop()!;
  
  const mimeTypeMap: Record<string, string> = {
    'json': mimeTypesLite.JSON,
    'xml': mimeTypesLite.XML,
    'html': mimeTypesLite.HTML,
  };
  
  const mimeType = mimeTypeMap[ext] || mimeTypesLite.TXT;
  
  return new Response(await readFile(filePath), {
    headers: { 'Content-Type': mimeType }
  });
}`}
                  language="typescript"
                />
              </div>

              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">API Response Formatting</h3>
                </div>
                <CodeBlock
                  code={`import mimeTypesLite from 'mime-types-lite';

// Type-safe MIME type handling
type ApiFormat = 'JSON' | 'XML' | 'HTML';

const FORMAT_MAP: Record<ApiFormat, string> = {
  JSON: mimeTypesLite.JSON,
  XML: mimeTypesLite.XML,
  HTML: mimeTypesLite.HTML,
};

app.get('/export', (req, res) => {
  const format: ApiFormat = req.query.format as ApiFormat;
  res.setHeader('Content-Type', FORMAT_MAP[format]);
  sendExportedData(res, format);
});`}
                  language="typescript"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center rounded-2xl border bg-gradient-to-r from-primary/10 to-primary/5 p-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Try the interactive demo or install mime-types-lite in your project
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/demo">
                  Try Interactive Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href="https://www.npmjs.com/package/mime-types-lite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on npm
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

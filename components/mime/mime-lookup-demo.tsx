'use client';

import { useState } from 'react';
import mimeTypesLite from 'mime-types-lite';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check, FileText, Search } from 'lucide-react';

// Create extension to MIME mapping from the mimeTypesLite object
const extensionToMime: Record<string, string> = {
  'epub': mimeTypesLite.EPUB,
  'tex': mimeTypesLite.TEX,
  'ppt': mimeTypesLite.PPT,
  'pptx': mimeTypesLite.PPTX,
  'odt': mimeTypesLite.ODT,
  'ods': mimeTypesLite.ODS,
  'rtf': mimeTypesLite.RTF,
  'doc': mimeTypesLite.DOC,
  'docx': mimeTypesLite.DOCX,
  'xls': mimeTypesLite.XLS,
  'xlsx': mimeTypesLite.XLSX,
  'pdf': mimeTypesLite.PDF,
  'md': mimeTypesLite.MD,
  'txt': mimeTypesLite.TXT,
  'csv': mimeTypesLite.CSV,
  'xcf': mimeTypesLite.XCF,
  'psd': mimeTypesLite.PSD,
  'jp2': mimeTypesLite.JP2,
  'avif': mimeTypesLite.AVIF,
  'heic': mimeTypesLite.HEIC,
  'webp': mimeTypesLite.WEBP,
  'jpg': mimeTypesLite.JPG,
  'jpeg': mimeTypesLite.JPEG,
  'png': mimeTypesLite.PNG,
  'ico': mimeTypesLite.ICO,
  'gif': mimeTypesLite.GIF,
  'bmp': mimeTypesLite.BMP,
  'tiff': mimeTypesLite.TIFF,
  'svg': mimeTypesLite.SVG,
  'mkv': mimeTypesLite.MKV,
  'flv': mimeTypesLite.FLV,
  'wmv': mimeTypesLite.WMV,
  'mov': mimeTypesLite.MOV,
  'webm': mimeTypesLite.WEBM,
  'avi': mimeTypesLite.AVI,
  'mpeg': mimeTypesLite.MPEG,
  'mp4': mimeTypesLite.MP4,
  'amr': mimeTypesLite.AMR,
  'midi': mimeTypesLite.MIDI,
  'flac': mimeTypesLite.FLAC,
  'ogg': mimeTypesLite.OGG,
  'aac': mimeTypesLite.AAC,
  'mp3': mimeTypesLite.MP3,
  'wav': mimeTypesLite.WAV,
  'tar': mimeTypesLite.TAR,
  'gz': mimeTypesLite.GZ,
  '7z': mimeTypesLite.SEVEN_ZIP,
  'zip': mimeTypesLite.ZIP,
  'rar': mimeTypesLite.RAR,
  'bz2': mimeTypesLite.BZ2,
  'ics': mimeTypesLite.ICS,
  'atom': mimeTypesLite.ATOM,
  'rss': mimeTypesLite.RSS,
  'wasm': mimeTypesLite.WASM,
  'yaml': mimeTypesLite.YAML,
  'yml': mimeTypesLite.YAML,
  'graphql': mimeTypesLite.GRAPHQL,
  'json': mimeTypesLite.JSON,
  'xml': mimeTypesLite.XML,
  'js': mimeTypesLite.JS,
  'css': mimeTypesLite.CSS,
  'html': mimeTypesLite.HTML,
  'woff': mimeTypesLite.WOFF,
  'woff2': mimeTypesLite.WOFF2,
  'ttf': mimeTypesLite.TTF,
  'otf': mimeTypesLite.OTF,
};

// Create MIME to extension mapping
const mimeToExtension: Record<string, string> = Object.entries(extensionToMime).reduce(
  (acc, [ext, mime]) => {
    if (!acc[mime]) {
      acc[mime] = ext;
    }
    return acc;
  },
  {} as Record<string, string>
);

export function MimeLookupDemo() {
  const [filePath, setFilePath] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLookup = () => {
    // Extract extension from file path
    const ext = filePath.split('.').pop()?.toLowerCase() || '';
    const mimeType = extensionToMime[ext] || null;
    setResult(mimeType);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const examples = [
    'index.html',
    'styles.css',
    'app.js',
    'image.png',
    'document.pdf',
    'video.mp4',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          MIME Type Lookup
        </CardTitle>
        <CardDescription>
          Enter a file path or extension to get its MIME type
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-path">File Path / Extension</Label>
          <div className="flex gap-2">
            <Input
              id="file-path"
              placeholder="e.g., index.html or .png"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            />
            <Button onClick={handleLookup}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Try:</span>
          {examples.map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => {
                setFilePath(example);
                const ext = example.split('.').pop()?.toLowerCase() || '';
                setResult(extensionToMime[ext] || null);
              }}
            >
              {example}
            </Button>
          ))}
        </div>

        {result !== null && (
          <div className="rounded-lg border bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Result</p>
                <p className="mt-1 font-mono text-lg">
                  {result}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {result === undefined && filePath && (
          <div className="rounded-lg border bg-destructive/10 p-4 text-destructive">
            <p className="text-sm font-medium">MIME type not found for this extension</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { extensionToMime, mimeToExtension };

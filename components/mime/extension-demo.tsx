'use client';

import { useState } from 'react';

import { Copy, Check, FileCode, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


import { mimeToExtension } from './mime-lookup-demo';

export function ExtensionDemo() {
  const [mimeType, setMimeType] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLookup = () => {
    const ext = mimeToExtension[mimeType.toLowerCase()] || null;
    setResult(ext);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const examples = [
    'text/html',
    'application/json',
    'image/png',
    'video/mp4',
    'application/pdf',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Extension Lookup
        </CardTitle>
        <CardDescription>
          Enter a MIME type to get its typical file extension
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mime-type">MIME Type</Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              id="mime-type"
              placeholder="e.g., text/html or application/json"
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            />
            <Button onClick={handleLookup} className="sm:w-auto w-full">
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
                setMimeType(example);
                setResult(mimeToExtension[example] || null);
              }}
            >
              {example}
            </Button>
          ))}
        </div>

        {result !== null && (
          <div className="rounded-lg border bg-muted p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">Result</p>
                <p className="mt-1 font-mono text-base truncate sm:text-lg">
                  .{result}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8 shrink-0"
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

        {result === undefined && mimeType && (
          <div className="rounded-lg border bg-destructive/10 p-4 text-destructive">
            <p className="text-sm font-medium">Extension not found for this MIME type</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

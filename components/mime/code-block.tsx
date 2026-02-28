'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'typescript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50 dark:bg-zinc-900">
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">{title}</span>
          <span className="text-xs text-zinc-500">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute right-2 top-2 h-8 w-8 text-zinc-400 hover:text-zinc-50"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

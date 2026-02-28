'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstallationTabsProps {
  packageName?: string;
}

export function InstallationTabs({ packageName = 'mime-types-lite' }: InstallationTabsProps) {
  const [activeTab, setActiveTab] = useState<'npm' | 'yarn' | 'pnpm'>('npm');
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: `npm install ${packageName}`,
    yarn: `yarn add ${packageName}`,
    pnpm: `pnpm add ${packageName}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50 dark:bg-zinc-900">
      <div className="flex border-b border-zinc-800 bg-zinc-900/50">
        <button
          onClick={() => setActiveTab('npm')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'npm'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-zinc-50'
          }`}
        >
          npm
        </button>
        <button
          onClick={() => setActiveTab('yarn')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'yarn'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-zinc-50'
          }`}
        >
          Yarn
        </button>
        <button
          onClick={() => setActiveTab('pnpm')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'pnpm'
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:text-zinc-50'
          }`}
        >
          pnpm
        </button>
      </div>
      <div className="relative p-4">
        <pre className="overflow-x-auto text-sm">
          <code>{commands[activeTab]}</code>
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

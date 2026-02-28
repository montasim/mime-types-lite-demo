# mime-types-lite Demo

A comprehensive demo website showcasing the [mime-types-lite](https://www.npmjs.com/package/mime-types-lite) package - a lightweight, type-safe collection of common MIME types for Node.js and browser applications.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![mime-types-lite](https://img.shields.io/badge/mime--types--lite-1.7.2-green)](https://www.npmjs.com/package/mime-types-lite)

## ✨ Features

- 📄 **Homepage** - Package overview, installation guide, and API documentation
- 🎮 **Interactive Playground** - Test MIME type lookups directly in your browser
- 📚 **API Reference** - Complete documentation with usage examples
- 🔍 **Browse All Types** - View all 80+ available MIME types
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 🌓 **Dark/Light Mode** - Automatic theme switching
- 📱 **Responsive Design** - Works on all devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 9.x or higher

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/mime-types-lite-demo.git
cd mime-types-lite-demo
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 mime-types-lite Package

### Installation

```bash
npm install mime-types-lite
# or
yarn add mime-types-lite
# or
pnpm add mime-types-lite
```

### Basic Usage

```typescript
import mimeTypesLite from 'mime-types-lite';

// Access MIME types as constants
mimeTypesLite.HTML;   // 'text/html'
mimeTypesLite.PNG;    // 'image/png'
mimeTypesLite.JSON;   // 'application/json'
mimeTypesLite.PDF;    // 'application/pdf'
```

### TypeScript Support

```typescript
import mimeTypesLite, { type MimeType } from 'mime-types-lite';

// Type-safe MIME type references
const supportedTypes: MimeType[] = ['HTML', 'CSS', 'PNG', 'JPEG'];
```

### Create Lookup Functions

```typescript
import mimeTypesLite from 'mime-types-lite';

const extensionMap: Record<string, string> = {
  'html': mimeTypesLite.HTML,
  'css': mimeTypesLite.CSS,
  'js': mimeTypesLite.JS,
  'png': mimeTypesLite.PNG,
};

function getMimeType(extension: string): string | undefined {
  return extensionMap[extension.toLowerCase()];
}
```

## 🌐 Pages

### Homepage (`/`)

- Package introduction and features
- Installation instructions
- API documentation with examples
- Real-world use cases
- Links to npm and GitHub

### Demo Page (`/demo`)

Interactive playground with three tabs:

1. **MIME Lookup** - Enter file extensions to get MIME types
2. **Extension Lookup** - Enter MIME types to get file extensions
3. **Browse All** - View complete list of available MIME types

## 🏗️ Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   └── demo/
│       └── page.tsx       # Interactive demo page
├── components/
│   ├── header.tsx         # Site header
│   ├── footer.tsx         # Site footer
│   ├── mime/              # MIME demo components
│   │   ├── mime-lookup-demo.tsx
│   │   ├── extension-demo.tsx
│   │   ├── code-block.tsx
│   │   ├── feature-card.tsx
│   │   └── usage-example.tsx
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── config/                # App configuration
└── public/                # Static assets
```

## 📜 Available Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `pnpm dev`          | Start development server  |
| `pnpm build`        | Build for production      |
| `pnpm start`        | Start production server   |
| `pnpm lint`         | Run ESLint                |
| `pnpm lint:fix`     | Fix ESLint issues         |
| `pnpm format`       | Format code with Prettier |
| `pnpm format:check` | Check code formatting     |
| `pnpm typecheck`    | Run TypeScript type check |

## 🎨 Components

### MIME Demo Components

- **`MimeLookupDemo`** - Interactive MIME type lookup from file extensions
- **`ExtensionDemo`** - Interactive extension lookup from MIME types
- **`CodeBlock`** - Syntax-highlighted code blocks with copy functionality
- **`FeatureCard`** - Feature display cards
- **`UsageExample`** - Usage example cards

### Shared Components

- **`Header`** - Site navigation with npm and GitHub links
- **`Footer`** - Site footer with developer attribution

## 🔧 Configuration

### ESLint

ESLint is configured with comprehensive rules for TypeScript, React/Next.js, and code quality.

Configuration file: `eslint.config.mjs`

### Prettier

Prettier handles code formatting with single quotes, semicolons, and 2-space indentation.

Configuration file: `prettier.config.js`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

```bash
pnpm build
pnpm start
```

## 📚 Available MIME Types

The package includes 80+ MIME type constants:

### Document Types
- `HTML`, `CSS`, `JS`, `JSON`, `XML`, `PDF`, `MD`, `TXT`, `CSV`
- `DOC`, `DOCX`, `XLS`, `XLSX`, `PPT`, `PPTX`
- `ODT`, `ODS`, `RTF`, `TEX`, `EPUB`

### Image Types
- `PNG`, `JPG`, `JPEG`, `GIF`, `BMP`, `TIFF`, `SVG`, `ICO`
- `WEBP`, `AVIF`, `HEIC`, `PSD`, `XCF`, `JP2`

### Video Types
- `MP4`, `WEBM`, `MOV`, `AVI`, `MPEG`, `MKV`, `WMV`, `FLV`

### Audio Types
- `MP3`, `WAV`, `OGG`, `FLAC`, `AAC`, `MIDI`, `AMR`

### Archive Types
- `ZIP`, `TAR`, `GZ`, `BZ2`, `RAR`, `SEVEN_ZIP`

### Font Types
- `WOFF`, `WOFF2`, `TTF`, `OTF`

### Web Types
- `YAML`, `GRAPHQL`, `WASM`, `RSS`, `ATOM`, `ICS`

## 🔗 Links

- [mime-types-lite on npm](https://www.npmjs.com/package/mime-types-lite)
- [mime-types-lite on GitHub](https://github.com/montasim/mime-types-lite)
- [Developer GitHub](https://github.com/montasim)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [mime-types-lite](https://github.com/montasim/mime-types-lite) by Mohammad Montasim -Al- Mamun Shuvo
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ using [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/)

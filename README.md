# Next.js + shadcn/ui Template

A modern, production-ready Next.js 16 template with shadcn/ui, TypeScript, Tailwind CSS v4, and comprehensive tooling setup.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- 🚀 **Next.js 16** with App Router
- ⚛️ **React 19** with Server Components
- 🎨 **shadcn/ui** components
- 🎨 **Tailwind CSS v4** for styling
- 📘 **TypeScript** with strict mode
- 🔍 **ESLint** with comprehensive rules
- 💅 **Prettier** for code formatting
- 🪝 **Husky** + **lint-staged** for git hooks
- 📝 **Commitlint** for conventional commits
- 🐧 **pnpm** package manager
- 🎯 **Absolute imports** with `@/` prefix
- 📦 **Clean architecture** with organized folder structure
- 🤖 **AI Agent Guidelines** - Enforced coding standards for AI agents

## 🤖 AI Agent Guidelines

This repository includes comprehensive guidelines for AI agents (Claude, Cursor, GitHub Copilot, etc.) to ensure consistent, high-quality code:

- **[AI_GUIDELINES.md](./AI_GUIDELINES.md)** - Comprehensive coding standards (CLEAN CODE, SOLID, Next.js, API best practices)
- **[CLAUDE.md](./CLAUDE.md)** - Specific instructions for Claude AI
- **[.cursorrules](./.cursorrules)** - Rules for Cursor AI editor
- **[docs/](./docs/)** - Detailed documentation on architecture, patterns, and examples

**All AI agents working on this codebase should follow these guidelines** to maintain code quality and consistency.

## 🏗️ Project Structure

```
.
├── app/                  # Next.js App Router pages
├── components/           # React components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── config/              # App configuration
├── public/              # Static assets
└── .vscode/             # VS Code settings
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **pnpm** 9.x or higher

### Installation

1. **Clone the repository** (or use as a GitHub template)

```bash
git clone https://github.com/yourusername/nextjs-shadcn-template.git
cd nextjs-shadcn-template
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables** (optional)

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## 🎨 Adding Components

### Adding shadcn/ui Components

Use the shadcn CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

Examples:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

### Creating Custom Components

Create custom components in the appropriate directories:

```bash
components/ui/      # UI-specific components
components/features/ # Feature-specific components
components/layouts/  # Layout components
```

## 🔧 Configuration

### ESLint

ESLint is configured with comprehensive rules for:

- TypeScript
- React/Next.js
- Import organization
- Code quality and complexity

Configuration file: `eslint.config.mjs`

### Prettier

Prettier handles code formatting with:

- Single quotes
- Semicolons
- 2-space indentation
- Trailing commas

Configuration file: `prettier.config.js`

### Git Hooks

Git hooks are managed by Husky:

- **pre-commit**: Runs lint-staged (ESLint + Prettier)
- **commit-msg**: Validates commit messages with Commitlint

### Conventional Commits

This project uses conventional commits. Format your commit messages as:

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

Example:

```bash
git commit -m "feat(auth): add user login component"
```

## 📦 Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

Access environment variables type-safely in `config/env.ts`:

```typescript
import { publicEnv, isDevelopment } from '@/config/env';

console.log(publicEnv.appUrl);
console.log(isDevelopment);
```

## 🎯 Best Practices

### Code Style

- Use **TypeScript** for all new files
- Follow **SOLID principles**
- Keep components **small and focused**
- Use **absolute imports** (`@/components/...`)
- Add **JSDoc comments** for utility functions

### Component Organization

```
components/
├── ui/           # Generic UI components (buttons, inputs, etc.)
├── features/     # Feature-specific components
└── layouts/      # Layout components (header, sidebar, etc.)
```

### Utility Functions

Add utility functions to `lib/utils.ts`:

- `cn()` - Merge Tailwind classes
- `formatDate()` - Format dates
- `formatCurrency()` - Format currency
- `truncate()` - Truncate text
- `debounce()` - Debounce functions

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ using [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/)

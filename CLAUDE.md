# Claude AI Instructions for Next.js + shadcn/ui Template

## Repository Context

- **Framework:** Next.js 16.1.6 with App Router and React 19
- **Language:** TypeScript 5 with strict mode enabled
- **Styling:** Tailwind CSS v4 with shadcn/ui components
- **Package Manager:** pnpm (not npm, yarn, or bun)
- **Type Safety:** Strict TypeScript - never use `any`

## Project Structure

```
app/              # Next.js App Router (pages, layouts, API routes)
components/
  ├── ui/         # shadcn/ui generic components
  ├── features/   # Feature-specific components
  └── layouts/    # Layout components
lib/
  ├── utils.ts    # Utilities: cn, formatDate, formatCurrency, etc.
  └── constants.ts # Constants: HttpStatus, ENV, CURRENCY, LOCALE, etc.
hooks/            # Custom React hooks
types/            # TypeScript types: ApiResponse, PaginatedResponse, etc.
config/
  └── env.ts      # Type-safe environment variable access
```

---

## Critical Rules

### Code Style & Format

- Follow existing ESLint rules in `eslint.config.mjs`
- Use Prettier configuration (single quotes, semicolons, 2-space indent)
- Enforced limits: complexity ≤ 10, max depth ≤ 4, max params ≤ 4
- Organized imports: builtin → external → internal → parent → sibling → type

### Component Development

- **`components/ui/`** for generic UI components (buttons, inputs, etc.)
- **`components/features/`** for feature-specific components
- **`components/layouts/`** for layout components
- Follow shadcn/ui patterns with `class-variance-authority`
- **Always use `cn()` utility from `@/lib/utils`** for className merging
- Use `React.forwardRef` for components receiving refs
- Define props interfaces extending React HTML attributes
- Keep components under 150 lines

### Type Safety

- **Never use `any`** - use proper TypeScript types or `unknown`
- Use `import type { ... }` for type-only imports
- Reuse types from `@/types` (`ApiResponse`, `PaginatedResponse`, `AsyncState`)
- Use generics appropriately for reusable components
- Type all props, returns, and function parameters

### Utilities & Constants

- **Always check existing utilities before creating new ones**
- Import utilities from `@/lib/utils`:
  - `cn()` - Merge Tailwind classes
  - `formatDate()` - Format dates
  - `formatCurrency()` - Format currency
  - `formatNumber()` - Format numbers
  - `truncate()` - Truncate text
  - `debounce()` - Debounce functions
- Import constants from `@/lib/constants`:
  - `HttpStatus` - HTTP status codes (200, 404, 500, etc.)
  - `ENV` - Environment values
  - `PAGINATION`, `CURRENCY`, `LOCALE`, `REGEX`, `STORAGE_KEY`, `EVENT`, `ERROR_CODE`
- Add new utilities to `lib/utils.ts` with JSDoc comments
- Add new constants to `lib/constants.ts` with proper grouping

### Environment Variables

- Access env vars via `@/config/env` (`publicEnv`, `serverEnv`, `isDevelopment`)
- **Never use `process.env` directly in components**
- Define all env variables in `config/env.ts` with validation
- Use `getOptionalEnv()` or `_getRequiredEnv()` helper functions

### API Development

- Use `ApiResponse<T>` and `ApiError` from `@/types`
- Use `HttpStatus` from `@/lib/constants` for status codes
- Implement proper error handling with try-catch
- Return appropriate status codes:
  - `200 OK` - Successful GET/PUT/PATCH
  - `201 CREATED` - Successful POST
  - `204 NO CONTENT` - Successful DELETE
  - `400 BAD REQUEST` - Invalid input
  - `401 UNAUTHORIZED` - Not authenticated
  - `403 FORBIDDEN` - Not authorized
  - `404 NOT_FOUND` - Resource not found
  - `500 INTERNAL_SERVER_ERROR` - Server error

### Next.js Best Practices

- **Use Server Components by default** (no 'use client' directive)
- **Only add `'use client'`** when necessary (interactivity, browser APIs, hooks)
- Use App Router patterns: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`
- Use async components for data fetching with `await`
- Leverage React 19 features where appropriate
- Use `<Link>` from `next/link` for navigation

### File Organization

- Keep components under 150 lines (ESLint enforced)
- One component per file
- Co-locate related styles, types, and utilities
- Use index.ts for barrel exports in directories

### Git Conventions

- Follow conventional commits: `feat(scope): description`
- Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Husky pre-commit hooks auto-run lint-staged
- Commitlint validates commit message format

---

## Before Making Changes

1. **Read existing code** in the target directory
2. **Follow existing patterns** (imports, exports, structure)
3. **Check for similar utilities/constants** that already exist
4. **Ensure TypeScript strict compliance**
5. **Run `pnpm typecheck`** before committing

---

## Testing Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm typecheck    # TypeScript type check
```

---

## Quick Reference

| Need            | Location                                     |
| --------------- | -------------------------------------------- |
| Merge classes   | `cn()` from `@/lib/utils`                    |
| Format dates    | `formatDate()` from `@/lib/utils`            |
| Format currency | `formatCurrency()` from `@/lib/utils`        |
| HTTP status     | `HttpStatus` from `@/lib/constants`          |
| Regex patterns  | `REGEX` from `@/lib/constants`               |
| API types       | `ApiResponse<T>` from `@/types`              |
| Env vars        | `publicEnv`, `serverEnv` from `@/config/env` |

---

## For Detailed Guidelines

See [AI_GUIDELINES.md](./AI_GUIDELINES.md) for comprehensive documentation including:

- CLEAN CODE principles
- SOLID principles with examples
- Next.js best practices
- API best practices
- Component patterns
- Prohibited patterns

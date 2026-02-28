# AI Agent Coding Guidelines

This document provides comprehensive coding guidelines for all AI agents working on this Next.js + shadcn/ui repository.

## Repository Overview

**Tech Stack:**

- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19 (Server Components), shadcn/ui components
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5 (strict mode)
- **Package Manager:** pnpm
- **Code Quality:** ESLint, Prettier, Husky, lint-staged, Commitlint

**Project Structure:**

```
app/              # Next.js App Router pages, layouts, API routes
components/
  ├── ui/         # shadcn/ui generic components (button, input, etc.)
  ├── features/   # Feature-specific components
  └── layouts/    # Layout components (header, sidebar, etc.)
lib/              # Utility functions and constants
  ├── utils.ts    # General utilities (cn, formatDate, formatCurrency, etc.)
  └── constants.ts # Application constants (HttpStatus, ENV, CURRENCY, etc.)
hooks/            # Custom React hooks
types/            # TypeScript type definitions
config/           # Configuration files
  └── env.ts      # Type-safe environment variable access
public/           # Static assets
```

---

## 1. CLEAN CODE PRINCIPLES

### 1.1 Meaningful Names

- Use descriptive, intention-revealing names
- Functions should use verbs: `getUserData`, `formatCurrency`, `validateEmail`
- Variables should use nouns: `userList`, `errorMessage`, `isLoading`
- Avoid single-letter variables except for loop iterators (`i`, `j`, `k`)
- Use pronounceable names

### 1.2 Small Functions

- Keep functions under 150 lines (ESLint enforced)
- Max complexity: 10 (ESLint enforced)
- Max depth: 4 (ESLint enforced)
- Max parameters: 4 (ESLint enforced)
- Single Responsibility Principle - one thing, well done

### 1.3 No Code Duplication (DRY)

- Extract reusable logic to utilities
- **Always check existing utilities before creating new ones**
- Use existing utilities from `@/lib/utils`
- Use existing constants from `@/lib/constants`

### 1.4 Comments

- Add JSDoc comments to utility functions
- Comment **WHY**, not WHAT
- Keep comments up to date
- Delete commented-out code

---

## 2. SOLID PRINCIPLES

### 2.1 Single Responsibility Principle (SRP)

Each function/component should have one reason to change.

**❌ Bad - Multiple Responsibilities:**

```typescript
async function processUserRegistration(formData: FormData) {
  // Validation
  if (!formData.email) throw new Error('Email required');

  // Transform
  const user = { email: formData.email, name: formData.name };

  // Save to database
  await db.users.create(user);

  // Send email
  await emailService.sendWelcome(user);

  // Log analytics
  analytics.track('user_signup', { user });

  return user;
}
```

**✅ Good - Separate Functions:**

```typescript
function validateUserForm(data: FormData): ValidationResult {
  if (!data.email) return { isValid: false, errors: [{ field: 'email', message: 'Required' }] };
  return { isValid: true, errors: [] };
}

function transformFormData(data: FormData): UserInput {
  return { email: data.email, name: data.name };
}

async function saveUser(user: UserInput): Promise<User> {
  return db.users.create(user);
}

async function sendWelcomeEmail(user: User): Promise<void> {
  await emailService.sendWelcome(user);
}

function trackUserSignup(user: User): void {
  analytics.track('user_signup', { user });
}

// Orchestrator function
async function processUserRegistration(formData: FormData) {
  const validation = validateUserForm(formData);
  if (!validation.isValid) throw new ValidationError(validation.errors);

  const userInput = transformFormData(formData);
  const user = await saveUser(userInput);

  await Promise.all([sendWelcomeEmail(user), trackUserSignup(user)]);

  return user;
}
```

### 2.2 Open/Closed Principle (OCP)

Components should be open for extension, closed for modification.

**Use `class-variance-authority` for component variants:**

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      destructive: 'destructive-classes',
      outline: 'outline-classes',
    },
  },
});
```

### 2.3 Liskov Substitution Principle (LSP)

Properly extend base props for type safety.

```typescript
// ✅ Correct - Extends HTML button attributes
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

### 2.4 Interface Segregation Principle (ISP)

Split large interfaces into smaller, focused ones.

```typescript
// ✅ Good - Segregated interfaces
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserRepository {
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

interface EmailService {
  sendEmail(user: User): Promise<void>;
}
```

### 2.5 Dependency Inversion Principle (DIP)

Depend on abstractions, not concrete implementations.

```typescript
// ❌ Bad - Concrete dependency
class UserService {
  private db = new MongoDB(); // Tightly coupled
}

// ✅ Good - Abstract dependency
interface Database {
  save(data: unknown): Promise<void>;
}

class UserService {
  constructor(private db: Database) {} // Loosely coupled
}
```

---

## 3. NEXT.JS BEST PRACTICES

### 3.1 App Router Patterns

**Server Components (Default) - No 'use client' needed:**

```typescript
// app/users/page.tsx
export default async function UsersPage() {
  const users = await fetchUsers(); // Direct data fetching
  return <UserList users={users} />;
}
```

**Client Components - Only when using hooks or interactivity:**

```typescript
'use client';

import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 3.2 Data Fetching Patterns

**Server Component Data Fetching:**

```typescript
async function getUsers(): Promise<User[]> {
  const res = await fetch('https://api.example.com/users', {
    cache: 'force-cache', // or { next: { revalidate: 3600 } }
  });

  if (!res.ok) throw new Error('Failed to fetch users');

  return res.json();
}
```

**Client Component Data Fetching:**

```typescript
'use client';
import { useEffect, useState } from 'react';
import type { AsyncState } from '@/types';

export function useUsers() {
  const [state, setState] = useState<AsyncState<User[]>>({ status: 'loading' });

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setState({ status: 'success', data }))
      .catch((error) => setState({ status: 'error', error }));
  }, []);

  return state;
}
```

### 3.3 Route Organization

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Loading skeleton
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (marketing)/        # Route group (no URL segment)
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
└── api/
    └── users/
        └── route.ts    # API route
```

### 3.4 Use Next.js Link for Navigation

```typescript
import Link from 'next/link';

<Link href="/dashboard">Dashboard</Link>
```

---

## 4. API BEST PRACTICES

### 4.1 RESTful Design

**HTTP Methods:**

- `GET` - Fetch resources (no side effects)
- `POST` - Create new resources
- `PUT` - Update entire resources
- `PATCH` - Partial updates
- `DELETE` - Remove resources

**Example Route Structure:**

```
/api/users          GET    - List users
/api/users          POST   - Create user
/api/users/[id]     GET    - Get single user
/api/users/[id]     PATCH  - Update user
/api/users/[id]     DELETE - Delete user
```

### 4.2 API Route Pattern

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, ApiError } from '@/types';
import { HttpStatus, ERROR_CODE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    const users = await getUsers(page);

    return NextResponse.json<ApiResponse<User[]>>({
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: ERROR_CODE.INTERNAL_ERROR,
          message: 'Failed to fetch users',
        },
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
```

### 4.3 Status Codes

Use `HttpStatus` from `@/lib/constants`:

- `200 OK` - Successful GET, PUT, PATCH
- `201 CREATED` - Successful POST
- `204 NO CONTENT` - Successful DELETE
- `400 BAD REQUEST` - Invalid input
- `401 UNAUTHORIZED` - Not authenticated
- `403 FORBIDDEN` - Authenticated but not authorized
- `404 NOT_FOUND` - Resource not found
- `500 INTERNAL_SERVER_ERROR` - Server error

### 4.4 Validation

```typescript
import { REGEX } from '@/lib/constants';
import type { FormValidationResult, FieldError } from '@/types';

function validateEmail(email: string): FormValidationResult {
  const errors: FieldError[] = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!REGEX.EMAIL.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

---

## 5. UTILITIES & CONSTANTS

### 5.1 Existing Utilities (@/lib/utils)

**Always check these utilities before creating new ones:**

| Utility                                    | Purpose                     |
| ------------------------------------------ | --------------------------- |
| `cn(...inputs)`                            | Merge Tailwind CSS classes  |
| `formatDate(date, locale)`                 | Format dates with locale    |
| `formatCurrency(amount, currency, locale)` | Format currency             |
| `formatNumber(num, locale)`                | Format numbers              |
| `truncate(text, maxLength)`                | Truncate text with ellipsis |
| `debounce(func, wait)`                     | Debounce functions          |

### 5.2 Existing Constants (@/lib/constants)

**Always check these constants before defining new ones:**

| Group         | Contents                                           |
| ------------- | -------------------------------------------------- |
| `HttpStatus`  | HTTP status codes (200, 404, 500, etc.)            |
| `ENV`         | Environment values (development, production, test) |
| `PAGINATION`  | Pagination defaults                                |
| `CURRENCY`    | Currency codes (USD, EUR, etc.)                    |
| `LOCALE`      | Locale codes (en-US, de-DE, etc.)                  |
| `REGEX`       | Regex patterns (email, URL, phone, slug)           |
| `STORAGE_KEY` | localStorage keys                                  |
| `EVENT`       | Analytics event names                              |
| `ERROR_CODE`  | Error code constants                               |
| `TIME`        | Time constants in milliseconds                     |
| `DEBOUNCE`    | Debounce timing defaults                           |
| `THEME`       | Theme values (light, dark, system)                 |

---

## 6. TYPE SAFETY

### 6.1 Reusable Types (@/types)

Use these existing types:

- `ApiResponse<T>` - Success response wrapper
- `ApiError` - Error response
- `ApiResult<T>` - Union of success/error
- `PaginatedResponse<T>` - Paginated data
- `PaginationParams` - Pagination parameters
- `AsyncState<T, E>` - Async operation state
- `LoadingState` - Status type

### 6.2 Type-Only Imports

```typescript
// ✅ Correct
import type { User } from '@/types';
import { cn } from '@/lib/utils';

// ❌ Avoid (unless value is needed)
import { User } from '@/types';
```

### 6.3 No `any` Types

Never use `any`. Use proper TypeScript types or `unknown` if type is truly unknown.

---

## 7. ENVIRONMENT VARIABLES

### 7.1 Access Pattern

```typescript
// ✅ Correct - Import from config
import { publicEnv, serverEnv, isDevelopment } from '@/config/env';

console.log(publicEnv.appUrl);
console.log(isDevelopment);

// ❌ Wrong - Direct access
console.log(process.env.NEXT_PUBLIC_APP_URL);
```

### 7.2 Adding New Variables

1. Add to `.env.example` for documentation
2. Add to `config/env.ts` with validation
3. Use `getOptionalEnv()` or `_getRequiredEnv()`

```typescript
// config/env.ts
export const publicEnv = {
  // ...existing
  analyticsId: getOptionalEnv(process.env.NEXT_PUBLIC_ANALYTICS_ID, ''),
} as const;
```

---

## 8. IMPORT ORGANIZATION

Imports are organized by ESLint in this order:

1. **Builtin** - Node.js builtins (fs, path)
2. **External** - npm packages (react, next)
3. **Internal** - `@/` imports (@/components, @/lib)
4. **Parent** - `../` imports
5. **Sibling** - `./` imports
6. **Type** - type-only imports

**Example:**

```typescript
import { type ClassValue } from 'clsx'; // External
import { useState } from 'react'; // External

import { Button } from '@/components/ui/button'; // Internal
import { cn } from '@/lib/utils'; // Internal
import type { User } from '@/types'; // Type

import { Header } from './Header'; // Sibling
import { Footer } from './Footer'; // Sibling
```

---

## 9. COMPONENT PATTERNS

### 9.1 UI Component Pattern (shadcn/ui)

```typescript
// components/ui/button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('base-classes', {
  variants: { variant: {}, size: {} },
  defaultVariants: { variant: 'default', size: 'default' },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

### 9.2 Feature Component Pattern

```typescript
// components/features/user-card.tsx
import type { User } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <h3>{user.name}</h3>
      <p>Joined {formatDate(user.createdAt)}</p>
    </Card>
  );
}
```

### 9.3 Component Organization

- Use `components/ui/` for generic UI components
- Use `components/features/` for feature-specific components
- Use `components/layouts/` for layout components
- One component per file
- Keep components under 150 lines

---

## 10. TESTING BEFORE COMMITTING

Always run these commands before committing:

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint
pnpm lint:fix  # Auto-fix issues

# Format check
pnpm format:check
pnpm format     # Auto-format

# Build
pnpm build      # Ensure production build works
```

---

## 11. GIT CONVENTIONS

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system changes
- `ci` - CI/CD changes
- `chore` - Other changes

**Examples:**

```
feat(auth): add user login component
fix(api): handle missing environment variables
docs(readme): update installation instructions
```

---

## 12. PROHIBITED PATTERNS

1. **No `any` types** - Use proper TypeScript
2. **No `process.env` in components** - Use `@/config/env`
3. **No `console.log`** - Use `console.warn` or `console.error`
4. **No duplicate utilities** - Check `@/lib/utils` first
5. **No hardcoded constants** - Use `@/lib/constants`
6. **No inline styles** - Use Tailwind classes
7. **No multiple components per file** - One per file
8. **No missing error handling** - Always use try-catch
9. **No missing types** - Type all props, returns, variables
10. **No breaking ESLint rules** - Fix all linting issues

---

## 13. QUICK REFERENCE

| Need               | Location                                     |
| ------------------ | -------------------------------------------- |
| Merge classes      | `cn()` from `@/lib/utils`                    |
| Format dates       | `formatDate()` from `@/lib/utils`            |
| Format currency    | `formatCurrency()` from `@/lib/utils`        |
| Truncate text      | `truncate()` from `@/lib/utils`              |
| Debounce           | `debounce()` from `@/lib/utils`              |
| HTTP status        | `HttpStatus` from `@/lib/constants`          |
| Regex patterns     | `REGEX` from `@/lib/constants`               |
| API response types | `ApiResponse<T>` from `@/types`              |
| Pagination types   | `PaginatedResponse<T>` from `@/types`        |
| Env variables      | `publicEnv`, `serverEnv` from `@/config/env` |
| Detailed patterns  | See `docs/PATTERNS.md`                       |
| Component patterns | See `docs/COMPONENTS.md`                     |
| API design         | See `docs/API_DESIGN.md`                     |
| SOLID examples     | See `docs/SOLID_EXAMPLES.md`                 |

---

For detailed documentation, see:

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture overview
- [docs/PATTERNS.md](./docs/PATTERNS.md) - Common patterns
- [docs/COMPONENTS.md](./docs/COMPONENTS.md) - Component patterns
- [docs/API_DESIGN.md](./docs/API_DESIGN.md) - API design
- [docs/SOLID_EXAMPLES.md](./docs/SOLID_EXAMPLES.md) - SOLID principles

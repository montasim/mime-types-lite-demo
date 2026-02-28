# Architecture Documentation

This document describes the architectural decisions and patterns used in this Next.js + shadcn/ui template.

## Overview

This is a modern, production-ready Next.js 16 template with:

- **App Router** for routing and layouts
- **Server Components** by default for optimal performance
- **TypeScript strict mode** for type safety
- **shadcn/ui** for UI components
- **Tailwind CSS v4** for styling
- **pnpm** for package management

---

## Technology Choices

### Next.js 16 with App Router

**Why:**

- Server Components by default for better performance
- Streaming and suspense support
- Built-in data fetching and caching
- Simplified routing with file-based system
- React 19 support

**Key Patterns:**

- Default to Server Components (no `'use client'` directive)
- Use `'use client'` only when needed (hooks, interactivity, browser APIs)
- Use async components for data fetching
- Implement `loading.tsx` and `error.tsx` for routes

### TypeScript Strict Mode

**Why:**

- Type safety at compile time
- Better IDE support and autocomplete
- Catches bugs before runtime
- Enables confident refactoring

**Configuration:**

- Strict mode enabled in `tsconfig.json`
- Path aliases: `@/*` maps to root
- No `any` types allowed

### shadcn/ui + Tailwind CSS v4

**Why:**

- Copy-paste components, not npm dependencies
- Full customization control
- Consistent design system
- Utility-first CSS approach

**Pattern:**

- Components in `components/ui/` follow shadcn/ui patterns
- Use `class-variance-authority` for variants
- Use `cn()` utility for className merging
- Extend React HTML attributes for props

---

## Folder Structure Philosophy

### `/app` - Next.js App Router

Contains pages, layouts, and API routes using the App Router.

**Organization:**

- Server Components by default
- File-based routing
- Co-located layouts and loading states
- Route groups for logical grouping (e.g., `(marketing)`, `(dashboard)`)

**Pattern:**

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Loading skeleton
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── (marketing)/        # Route group
│   └── page.tsx
└── api/
    └── users/
        └── route.ts    # API route
```

### `/components` - React Components

Organized by purpose, not by type.

**Subdirectories:**

- `ui/` - Generic, reusable UI components (buttons, inputs, cards)
- `features/` - Feature-specific components (UserCard, ProductList)
- `layouts/` - Layout components (Header, Sidebar, Footer)

**Philosophy:**

- One component per file
- Components under 150 lines
- Follow shadcn/ui patterns for UI components

### `/lib` - Pure Functions and Utilities

**Files:**

- `utils.ts` - General utilities (cn, formatDate, formatCurrency, etc.)
- `constants.ts` - Application constants (HttpStatus, ENV, CURRENCY, etc.)

**Philosophy:**

- Pure functions with no side effects
- JSDoc comments for all utilities
- Group related constants
- Use `as const` for readonly objects

### `/hooks` - Custom React Hooks

**Purpose:**

- Reusable stateful logic
- Custom hooks for data fetching, form handling, etc.

**Naming:**

- camelCase with 'use' prefix
- Examples: `useAuth`, `useForm`, `useUsers`

### `/types` - TypeScript Type Definitions

**Purpose:**

- Shared type definitions across the application
- Reusable interfaces and types

**Common Types:**

- `ApiResponse<T>` - Success response wrapper
- `ApiError` - Error response
- `PaginatedResponse<T>` - Paginated data
- `AsyncState<T, E>` - Async operation state

### `/config` - Configuration Files

**Files:**

- `env.ts` - Type-safe environment variable access

**Pattern:**

- Centralize configuration
- Validate at runtime
- Separate server-side and public env vars

---

## Design Principles

### 1. Convention Over Configuration

Follow established patterns rather than creating new conventions:

**Component Organization:**

- UI components → `components/ui/`
- Feature components → `components/features/`
- Layout components → `components/layouts/`

**Imports:**

- Use `@/` prefix for internal imports
- Type-only imports: `import type { ... }`
- Import order enforced by ESLint

### 2. Type Safety First

Leverage TypeScript strict mode for compile-time safety:

**Never:**

- Use `any` type
- Use `process.env` directly in components
- Skip typing props, returns, or parameters

**Always:**

- Use proper TypeScript types
- Import types with `import type`
- Define interfaces for component props
- Use generics for reusable components

### 3. Server Components by Default

Maximize performance with Server Components:

**Default:**

```typescript
// No 'use client' needed
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

**Only when necessary:**

```typescript
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 4. Single Responsibility

Each function/component does one thing well:

**Bad:**

```typescript
async function handleUserSubmit(formData: FormData) {
  // Validates
  // Transforms
  // Saves to database
  // Sends email
  // Logs analytics
}
```

**Good:**

```typescript
function validateUserForm(data: FormData) {
  /* ... */
}
function transformFormData(data: FormData) {
  /* ... */
}
async function saveUser(user: UserInput) {
  /* ... */
}
async function sendWelcomeEmail(user: User) {
  /* ... */
}
function trackUserSignup(user: User) {
  /* ... */
}

async function handleUserSubmit(formData: FormData) {
  // Orchestrates the above functions
}
```

### 5. Don't Repeat Yourself (DRY)

Reuse existing utilities and constants:

**Before creating new utilities, check:**

- `@/lib/utils` - cn, formatDate, formatCurrency, formatNumber, truncate, debounce
- `@/lib/constants` - HttpStatus, ENV, PAGINATION, CURRENCY, LOCALE, REGEX, etc.
- `@/types` - ApiResponse, ApiError, PaginatedResponse, AsyncState

---

## Data Flow Patterns

### Server Component Data Fetching

```typescript
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'force-cache',
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  return <UserList users={users} />;
}
```

### Client Component Data Fetching

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

### API Route Pattern

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, ApiError } from '@/types';
import { HttpStatus, ERROR_CODE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();

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

---

## Component Patterns

### UI Component Pattern (shadcn/ui)

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('base-classes', {
  variants: { variant: {}, size: {} },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

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

### Feature Component Pattern

```typescript
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

---

## Error Handling Patterns

### API Error Response

```typescript
import { ApiError } from '@/types';
import { HttpStatus, ERROR_CODE } from '@/lib/constants';

function createErrorResponse(
  code: string,
  message: string,
  status: number
): NextResponse<ApiError> {
  return NextResponse.json<ApiError>(
    {
      success: false,
      error: { code, message },
    },
    { status }
  );
}

// Usage
return createErrorResponse(ERROR_CODE.NOT_FOUND, 'User not found', HttpStatus.NOT_FOUND);
```

---

For more detailed patterns, see:

- [PATTERNS.md](./PATTERNS.md) - Common patterns and how to use them
- [COMPONENTS.md](./COMPONENTS.md) - Component patterns
- [API_DESIGN.md](./API_DESIGN.md) - API route design
- [SOLID_EXAMPLES.md](./SOLID_EXAMPLES.md) - SOLID principles with examples

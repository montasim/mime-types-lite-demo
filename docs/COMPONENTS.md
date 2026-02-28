# Component Patterns

This document describes component patterns used in this codebase.

## UI Component Pattern (shadcn/ui)

Generic, reusable UI components following shadcn/ui conventions.

```typescript
// components/ui/button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
  }
);

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

## Feature Component Pattern

Feature-specific components that use UI components and utilities.

```typescript
// components/features/user-card.tsx
import type { User } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <h3>{user.name}</h3>
      <p>Joined {formatDate(user.createdAt)}</p>
    </Card>
  );
}
```

## Layout Component Pattern

Reusable layout components (headers, sidebars, footers).

```typescript
// components/layouts/header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">Logo</Link>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button>Sign Up</Button>
        </div>
      </nav>
    </header>
  );
}
```

## Component Organization

- One component per file
- Keep components under 150 lines
- Co-locate related styles, types, utilities
- Use index.ts for barrel exports in directories

For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md)

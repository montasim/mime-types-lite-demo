# Common Patterns

This document catalogs common patterns used throughout the codebase.

## Component Patterns

### Class Merging with cn()

Always use the `cn()` utility for merging Tailwind classes.

```typescript
import { cn } from '@/lib/utils';

export function Button({ className, ...props }) {
  return (
    <button
      className={cn('base-classes', className)}
      {...props}
    />
  );
}
```

### Component Variants with CVA

Use `class-variance-authority` for component variants.

```typescript
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const variants = cva('base', {
  variants: {
    variant: {
      default: 'default-classes',
      destructive: 'destructive-classes',
      outline: 'outline-classes',
    },
    size: {
      sm: 'sm-classes',
      md: 'md-classes',
      lg: 'lg-classes',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
```

### Forwarding Refs

Use `React.forwardRef` for components that receive refs.

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <button ref={ref} {...props} />
);
Button.displayName = 'Button';
```

## Data Fetching Patterns

### Server Component Pattern

```typescript
async function getData() {
  const res = await fetch('/api/data', { cache: 'force-cache' });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### Client Component Pattern

```typescript
'use client';
import { useEffect, useState } from 'react';

export function DataFetcher() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  return <div>{data?.title}</div>;
}
```

## Error Handling Patterns

### API Error Response

```typescript
import { ApiError } from '@/types';
import { HttpStatus, ERROR_CODE } from '@/lib/constants';

try {
  // ...
} catch (error) {
  return NextResponse.json<ApiError>(
    {
      success: false,
      error: {
        code: ERROR_CODE.INTERNAL_ERROR,
        message: 'Operation failed',
      },
    },
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}
```

## Form Patterns

### Form State Management

```typescript
'use client';
import { useState } from 'react';
import type { FormValidationResult } from '@/types';

export function useForm<T extends Record<string, unknown>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldError[]>([]);

  const update = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return { values, errors, update };
}
```

For more patterns, see [ARCHITECTURE.md](./ARCHITECTURE.md)

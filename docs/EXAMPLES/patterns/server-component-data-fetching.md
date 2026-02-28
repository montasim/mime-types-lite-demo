# Server Component Data Fetching

## ✅ Correct Pattern - Async Server Component

```typescript
// app/users/page.tsx
import { ApiResponse } from '@/types';
import { HttpStatus } from '@/lib/constants';

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://api.example.com/users', {
    cache: 'force-cache', // or { next: { revalidate: 3600 } }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const result: ApiResponse<User[]> = await res.json();
  return result.data;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}
```

**Benefits:**

- Data fetching happens on the server
- No client-side JavaScript needed for data
- Automatic caching with Next.js
- Better performance
- Simplified code (no useState, useEffect)

## Caching Strategies

```typescript
// Static data - cache until manually invalidated
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache',
});

// Incremental Static Regeneration - revalidate every hour
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
});

// On-demand revalidation
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['users'] },
});
// Then revalidate: revalidateTag('users');
```

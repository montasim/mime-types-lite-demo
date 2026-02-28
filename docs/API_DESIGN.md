# API Route Design

This document describes API route design patterns for this Next.js template.

## RESTful Design

### HTTP Methods

- `GET` - Fetch resources (no side effects)
- `POST` - Create new resources
- `PUT` - Update entire resources
- `PATCH` - Partial updates
- `DELETE` - Remove resources

### Route Structure

```
/api/users          GET    - List users
/api/users          POST   - Create user
/api/users/[id]     GET    - Get single user
/api/users/[id]     PATCH  - Update user
/api/users/[id]     DELETE - Delete user
```

## Standard API Route Pattern

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await createUser(body);

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: user,
      },
      { status: HttpStatus.CREATED }
    );
  } catch (error) {
    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: ERROR_CODE.VALIDATION_ERROR,
          message: error.message,
        },
      },
      { status: HttpStatus.BAD_REQUEST }
    );
  }
}
```

## Error Handling

### Error Response Helper

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

## Status Codes

Use `HttpStatus` from `@/lib/constants`:

| Code | Constant                           | Usage                            |
| ---- | ---------------------------------- | -------------------------------- |
| 200  | `HttpStatus.OK`                    | Successful GET, PUT, PATCH       |
| 201  | `HttpStatus.CREATED`               | Successful POST                  |
| 204  | `HttpStatus.NO_CONTENT`            | Successful DELETE                |
| 400  | `HttpStatus.BAD_REQUEST`           | Invalid input                    |
| 401  | `HttpStatus.UNAUTHORIZED`          | Not authenticated                |
| 403  | `HttpStatus.FORBIDDEN`             | Authenticated but not authorized |
| 404  | `HttpStatus.NOT_FOUND`             | Resource not found               |
| 500  | `HttpStatus.INTERNAL_SERVER_ERROR` | Server error                     |

## Validation

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

For more patterns, see [PATTERNS.md](./PATTERNS.md)

# SOLID Principles Examples

Examples demonstrating SOLID principles in Next.js context.

## Single Responsibility Principle (SRP)

### Bad - Multiple Responsibilities

```typescript
// ❌ One function doing validation, transformation, database, email, and analytics
async function handleUserSubmit(formData: FormData) {
  if (!formData.email) throw new Error('Email required');
  const user = { email: formData.email, name: formData.name };
  await db.users.create(user);
  await emailService.sendWelcome(user);
  analytics.track('user_signup', { user });
  return user;
}
```

### Good - Separate Functions

```typescript
// ✅ Each function has one responsibility
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

// Orchestrator
async function handleUserSubmit(formData: FormData) {
  const validation = validateUserForm(formData);
  if (!validation.isValid) throw new ValidationError(validation.errors);

  const userInput = transformFormData(formData);
  const user = await saveUser(userInput);

  await Promise.all([sendWelcomeEmail(user), trackUserSignup(user)]);

  return user;
}
```

## Open/Closed Principle (OCP)

### Extensible Component Variants

```typescript
// ✅ Extensible through variants, not modification
import { cva } from 'class-variance-authority';

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

## Liskov Substitution Principle (LSP)

### Proper Type Extensions

```typescript
// ✅ Properly extending base props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

## Interface Segregation Principle (ISP)

### Bad - Fat Interface

```typescript
// ❌ Too many responsibilities in one interface
interface User {
  id: string;
  name: string;
  email: string;
  save(): Promise<void>;
  delete(): Promise<void>;
  sendEmail(): Promise<void>;
  validate(): boolean;
}
```

### Good - Segregated Interfaces

```typescript
// ✅ Split into focused interfaces
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

interface Validator<User> {
  validate(user: User): boolean;
}
```

## Dependency Inversion Principle (DIP)

### Bad - Concrete Dependency

```typescript
// ❌ Depends on concrete implementation
class UserService {
  private db = new MongoDB(); // Tight coupling
}
```

### Good - Abstract Dependency

```typescript
// ✅ Depends on abstraction
interface Database {
  save(data: unknown): Promise<void>;
}

class UserService {
  constructor(private db: Database) {} // Loose coupling
}
```

For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md)

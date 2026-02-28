# SOLID Principles Examples

## Single Responsibility Principle (SRP)

### ❌ Bad - Function Does Multiple Things

```typescript
async function handleUserRegistration(formData: FormData) {
  // 1. Validation
  if (!formData.email) throw new Error('Email required');

  // 2. Transformation
  const user = { email: formData.email, name: formData.name };

  // 3. Database operation
  await db.users.create(user);

  // 4. Email sending
  await emailService.sendWelcome(user);

  // 5. Analytics tracking
  analytics.track('user_signup', { user });

  return user;
}
```

**Problems:**

- Function has 5 responsibilities
- Hard to test
- Difficult to reuse individual operations
- Changes to one operation affect the entire function

### ✅ Good - Separate Functions, Single Responsibility

```typescript
// Each function has one job
function validateUserForm(data: FormData): ValidationResult {
  if (!data.email) {
    return { isValid: false, errors: [{ field: 'email', message: 'Required' }] };
  }
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

// Orchestrator function coordinates the operations
async function handleUserRegistration(formData: FormData) {
  // Validate
  const validation = validateUserForm(formData);
  if (!validation.isValid) throw new ValidationError(validation.errors);

  // Transform
  const userInput = transformFormData(formData);

  // Save
  const user = await saveUser(userInput);

  // Parallel independent operations
  await Promise.all([sendWelcomeEmail(user), trackUserSignup(user)]);

  return user;
}
```

**Benefits:**

- Each function has one clear responsibility
- Easy to test individual functions
- Reusable operations
- Changes to one operation don't affect others

# Component Organization Examples

## Single Component Per File

### ❌ Bad - Multiple Components in One File

```typescript
// components/ui/index.tsx
export function Button() {
  /* ... */
}
export function Input() {
  /* ... */
}
export function Select() {
  /* ... */
}
```

**Problems:**

- Hard to maintain
- Difficult to find specific components
- Violates Single Responsibility Principle
- Poor IDE performance

### ✅ Good - One Component Per File

```typescript
// components/ui/button.tsx
export function Button() {
  /* ... */
}

// components/ui/input.tsx
export function Input() {
  /* ... */
}

// components/ui/select.tsx
export function Select() {
  /* ... */
}
```

**Benefits:**

- Easy to locate and maintain
- Better IDE performance
- Clear file organization
- Follows Single Responsibility Principle

## Proper File Naming

### ❌ Bad - Inconsistent Naming

```
components/
├── user.tsx
├── UserCard.tsx
├── user-profile.tsx
└── userAvatar.tsx
```

### ✅ Good - Consistent PascalCase

```
components/
└── features/
    ├── User.tsx
    ├── UserCard.tsx
    ├── UserProfile.tsx
    └── UserAvatar.tsx
```

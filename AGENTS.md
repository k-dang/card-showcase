# Agent Guidelines for card-showcase

## Build & Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting (Biome)
pnpm lint

# Format code
pnpm format

# Format & fix all issues
pnpm format && biome check --write
```

**Note**: No test framework is currently configured. If tests are needed, add them to package.json scripts.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **TypeScript**: Strict mode enabled
- **Linting/Formatting**: Biome (NOT ESLint/Prettier)
- **Package Manager**: pnpm

## Path Aliases

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`

## Code Style Guidelines

### File Organization
- Client components: Use `"use client"` directive at the very top of the file
- Keep CSS files alongside component files (e.g., `Component.tsx` and `Component.css`)
- Use the App Router structure in `src/app/`

### Imports
- Use `type` keyword for type-only imports when possible
- Import CSS files after React imports but before component code
- Use path aliases for internal imports (e.g., `@/components/...`, `@/lib/utils`)

```tsx
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";
import "./Component.css";
import { cn } from "@/lib/utils";
```

### Component Structure
- Define interfaces for props before the component
- Use JSDoc comments for complex components (see TiltCard.tsx)
- Named exports preferred over default exports (but both are acceptable)
- Use `useCallback` for event handlers to prevent unnecessary re-renders

```tsx
interface ComponentProps {
  children: ReactNode;
  variant?: "default" | "primary";
}

export default function Component({ children, variant = "default" }: ComponentProps) {
  // implementation
}
```

### Styling
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Leverage CSS custom properties for dynamic values
- Use Tailwind classes for layout and spacing
- Use CSS modules or component-specific CSS files for complex animations

```tsx
className={cn("card-base", variant === "primary" && "card-primary")}
```

### TypeScript
- Strict mode is enabled - always provide types
- Use `type` keyword for type-only imports/exports
- Prefer `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` or proper types

### React Patterns
- Use `useRef<HTMLDivElement>()` for DOM element references
- Store animation frame IDs in refs for cleanup
- Clean up timeouts and animation frames in unmount handlers
- Use `requestAnimationFrame` for smooth updates (60fps)
- Use tracking class pattern to disable transitions during active mouse tracking

```tsx
const handleMouseLeave = useCallback(() => {
  if (rafId.current !== null) {
    cancelAnimationFrame(rafId.current);
    rafId.current = null;
  }
  if (trackingTimeoutRef.current !== null) {
    clearTimeout(trackingTimeoutRef.current);
    trackingTimeoutRef.current = null;
  }
  el.classList.remove("tracking");
  el.style.setProperty("--rotateX", "0deg");
}, []);
```

### CSS Custom Properties
- Use kebab-case for CSS variables: `--variable-name`
- Set CSS variables via inline styles: `el.style.setProperty("--rotateX", "30deg")`
- Use in CSS: `transform: rotateX(var(--rotateX, 0deg))`

### Naming Conventions
- Components: PascalCase (e.g., `HoloTiltCard`)
- Functions/variables: camelCase (e.g., `handleMouseMove`)
- Constants: UPPER_SNAKE_CASE for CSS variable names
- CSS classes: kebab-case with BEM-like structure (e.g., `card__shine`)

### Error Handling
- Always check for null/undefined refs before use
- Use optional chaining for nested access
- Provide default values for optional props

```tsx
const el = ref.current;
if (!el) return;
```

### Performance
- Use `will-change` CSS property for animated elements
- Use `transform` and `opacity` for animations (GPU accelerated)
- Debounce/throttle expensive operations
- Use `useCallback` and `useMemo` appropriately

## Linting Rules

Biome is configured with:
- Recommended rules enabled
- Next.js domain rules
- React domain rules
- Import organization enabled (runs automatically)
- 2-space indentation
- Suspicious noUnknownAtRules disabled (for CSS)

## Image Assets

- Place images in `public/img/`
- Use Next.js `Image` component for optimization
- Reference public assets without leading slash in relative paths (e.g., `/img/foil.webp`)

## Dark Mode

- Default theme is dark mode (see `layout.tsx`)
- Use Tailwind's `dark:` modifier or CSS custom properties with `.dark` class
- All colors use OKLCH color space for better perceptual uniformity

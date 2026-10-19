# Testing Strategy

This project uses a **two-layer testing approach** with Playwright:

## Layer 1: Rendering Tests
Tests that verify visual elements are rendered correctly:
- Element visibility and presence
- Visual properties (colors, dimensions, spacing)
- Image loading and display
- Text content and typography
- Layout and positioning
- Animation readiness (reveal and intro animations gated on `html.js-motion`)

**Timeout consideration**: Tests account for entrance animations with appropriate waits.

## Layer 2: User Action Tests
Tests that verify functionality and user interactions:
- Form filling and validation
- Button clicks and navigation
- Data submission (without actual API calls)
- User interactions (TOC navigation, scrolling)
- Newsletter signup
- Cookie acceptance
- Dynamic content updates

## Structure

Specs cover the home page sections, once per form factor:

```
tests/
└── home/
    ├── desktop/
    │   ├── hero.rendering.spec.ts / hero.actions.spec.ts
    │   ├── experience.*.spec.ts   (career section, #career)
    │   ├── projects.*.spec.ts
    │   ├── skills.*.spec.ts
    │   ├── blog.*.spec.ts         (latest articles)
    │   └── contact.*.spec.ts
    └── mobile/                    (same files, phone layout)
```

Inner pages (/about, /projects, /blog, /contact, /why, …) have no specs yet.

## Naming Convention

- `*.rendering.spec.ts` - Layer 1 tests (visual/rendering)
- `*.actions.spec.ts` - Layer 2 tests (user interactions)

## Device Coverage

All tests run on:
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12

## Running Tests

```bash
# Once: install browsers
npm run test:setup

# Run all tests (Playwright starts the app on port 3001 itself via `npm run test:server`;
# don't start it by hand, reuseExistingServer is off)
npm run test

# Run specific test file
npm run test -- tests/home/desktop/hero.rendering.spec.ts

# Run with UI
npm run test:ui

# View report
npm run test:report
```

## Best Practices

1. **Rendering tests** should be quick and focus on visual verification
2. **Action tests** should simulate realistic user behavior
3. Use descriptive test names that explain what is being tested
4. Account for animations and async operations with appropriate waits
5. Use semantic selectors (roles, labels) over brittle selectors
6. Keep tests independent - each test should be runnable in isolation

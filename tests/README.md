# Testing Strategy

This project uses a **two-layer testing approach** with Playwright:

## Layer 1: Rendering Tests
Tests that verify visual elements are rendered correctly:
- Element visibility and presence
- Visual properties (colors, dimensions, spacing)
- Image loading and display
- Text content and typography
- Layout and positioning
- Animation readiness (GSAP animations)

**Timeout consideration**: Tests account for GSAP animations with appropriate waits.

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

Tests are organized by page/section:

```
tests/
├── README.md (this file)
├── pages/
│   ├── home/
│   │   ├── hero.rendering.spec.ts      (Layer 1: Hero rendering)
│   │   ├── hero.actions.spec.ts        (Layer 2: Hero interactions)
│   │   ├── features.rendering.spec.ts
│   │   ├── features.actions.spec.ts
│   │   └── ...
│   ├── blog/
│   │   ├── post.rendering.spec.ts
│   │   ├── post.actions.spec.ts
│   │   └── ...
│   └── ...
└── shared/
    ├── header.rendering.spec.ts
    ├── header.actions.spec.ts
    ├── footer.rendering.spec.ts
    └── ...
```

## Naming Convention

- `*.rendering.spec.ts` - Layer 1 tests (visual/rendering)
- `*.actions.spec.ts` - Layer 2 tests (user interactions)

## Device Coverage

All tests run on:
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12

## Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- tests/pages/home/hero.rendering.spec.ts

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

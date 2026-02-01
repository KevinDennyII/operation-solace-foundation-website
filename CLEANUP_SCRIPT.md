# Code Cleanup Script

When the user requests "run the cleanup script", follow these standards systematically.

## Quick Checklist

Run through each section below, checking files that have been recently modified or are part of the current feature work.

---

## Part 1: Clean Code Principles (Backend/TypeScript)

### 1.1 Extract Magic Numbers to Named Constants
```typescript
// BAD
const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
if (value > 400000) { ... }

// GOOD
private static readonly SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
private static readonly HIGH_VALUE_THRESHOLD = 400000;
const cutoff = new Date(Date.now() - SEVEN_DAYS_MS);
```

### 1.2 Remove Unused Imports
- Check each file for imports that are no longer used
- Use LSP diagnostics to identify unused imports

### 1.3 Single Responsibility Principle
- Each class/function should do ONE thing
- Extract helper functions for complex logic
- Split large functions (>50 lines) into smaller focused functions

### 1.4 Meaningful Names
```typescript
// BAD
const d = new Date();
const arr = leads.filter(l => l.phoneNumber);

// GOOD
const currentDate = new Date();
const leadsWithPhones = leads.filter(lead => lead.phoneNumber);
```

### 1.5 Extract Configuration Objects
```typescript
// BAD (inside component/function)
const config = { timeout: 5000, retries: 3 };

// GOOD (module level constant)
const API_CONFIG = { timeout: 5000, retries: 3 } as const;
```

---

## Part 2: Josh Comeau's Joy of React Principles

### 2.1 Deriving State
**Store minimum data in state; derive computed values**
```tsx
// BAD - duplicating state
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0); // Don't store this!

// GOOD - derive from existing state
const [items, setItems] = useState([]);
const itemCount = items.length; // Derived!
```

### 2.2 Principle of Least Privilege
**Pass handlers over setters - give components only the power they need**
```tsx
// BAD - too much power
<AddItemForm setItems={setItems} />

// GOOD - limited power
<AddItemForm onAddItem={handleAddItem} />
```

### 2.3 Single Source of Truth
**Use controlled inputs bound to React state**
```tsx
// GOOD - controlled input
const [name, setName] = useState('');
<input value={name} onChange={(e) => setName(e.target.value)} />
```

### 2.4 Custom Hooks
**Extract reusable logic into hooks**
```tsx
// Extract complex logic
function useCampaignPreview({ targetAudience }) {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // ... fetch logic
  return { preview, isLoading };
}
```

### 2.5 Component Extraction
**Extract sub-components to reduce complexity**
```tsx
// BAD - huge component with inline JSX
function Dashboard() {
  return (
    <div>
      {/* 200 lines of metrics cards inline */}
    </div>
  );
}

// GOOD - extracted components
function MetricCard({ title, value, icon }) { ... }
function Dashboard() {
  return (
    <div>
      <MetricCard title="Total" value={100} icon={<Users />} />
    </div>
  );
}
```

### 2.6 Extract Constants Outside Components
```tsx
// BAD - recreated on every render
function MyComponent() {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];
  // ...
}

// GOOD - defined once at module level
const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
] as const;

function MyComponent() {
  // use OPTIONS
}
```

---

## Part 3: CSS for JS Devs (Josh Comeau's CSS Principles)

### 3.1 Flow Layout First
- Prefer natural document flow over position hacks
- Use flexbox/grid for layout, not absolute positioning
- Only use `position: absolute/fixed` when elements truly need to overlap

### 3.2 Box Model
- Use `box-sizing: border-box` (already set globally)
- Understand margin collapse behavior
- Prefer padding over margin for internal spacing

### 3.3 Modern Component Architecture
- Use TailwindCSS utility classes for styling
- Extract repeated patterns into reusable components
- Use CSS variables for theming (defined in index.css)

### 3.4 Semantic HTML
- Use proper semantic elements (`<button>`, `<nav>`, `<main>`, `<section>`)
- Don't use `<div>` for interactive elements
- Ensure proper heading hierarchy

### 3.5 Responsive Design
- Mobile-first approach (base styles for mobile, then media queries for larger)
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
- Avoid fixed widths; prefer max-width constraints

---

## Part 4: Cleanup Execution Steps

When running the cleanup script:

1. **Identify Target Files**
   - Check recently modified files
   - Focus on files mentioned in the current task

2. **Backend Cleanup** (server/ directory)
   - [ ] Remove unused imports
   - [ ] Extract magic numbers to constants
   - [ ] Check function sizes (split if >50 lines)
   - [ ] Verify meaningful variable names

3. **Frontend Cleanup** (client/src/ directory)
   - [ ] Check for derived state opportunities
   - [ ] Verify handlers vs setters (least privilege)
   - [ ] Extract constants outside components
   - [ ] Look for component extraction opportunities
   - [ ] Check for custom hook extraction opportunities

4. **CSS/Styling Cleanup**
   - [ ] Remove inline styles in favor of Tailwind classes
   - [ ] Check for semantic HTML usage
   - [ ] Verify responsive design patterns

5. **Final Checks**
   - [ ] Run LSP diagnostics for any errors
   - [ ] Restart workflow and verify no runtime errors
   - [ ] Check browser console for warnings

---

## Part 5: Verification & Testing (REQUIRED)

**Always verify that cleanup changes haven't broken anything!**

### 5.1 Backend Verification
Run these checks after any backend changes:

1. **Check Workflow Status**
   - Restart the application workflow
   - Verify server starts without errors
   - Check for any TypeScript compilation errors

2. **API Endpoint Verification**
   - Test key API endpoints that were affected by changes
   - Verify responses are correct format
   - Check for 500 errors in server logs

3. **LSP Diagnostics**
   - Run LSP diagnostics on modified files
   - Fix any type errors or missing imports
   - Ensure no unused variables remain

### 5.2 Frontend/UI Verification
Run these checks after any frontend changes:

1. **Browser Console Check**
   - Look for React errors (component rendering issues)
   - Check for failed network requests
   - Verify no "undefined" or "null" errors

2. **Visual Inspection**
   - Verify pages load correctly
   - Check that components render as expected
   - Test interactive elements (buttons, forms, navigation)

3. **Key User Flows to Test**
   - Home page loads with hero section
   - Resources page displays resource cards
   - Programs page lists active programs
   - Contact form validates input
   - Navigation links work correctly

### 5.3 Manual Verification Steps
For significant changes, perform a manual walkthrough:

```
Test Plan Example:
1. [Navigate] Go to the affected page
2. [Verify] Assert key elements are visible and functional
3. [Interact] Test any modified interactions (clicks, inputs)
4. [Verify] Assert expected results (UI updates, navigation)
```

### 5.4 Cleanup Verification Checklist

After completing cleanup:

| Check | Status |
|-------|--------|
| Workflow running without errors | [ ] |
| No LSP/TypeScript errors | [ ] |
| No browser console errors | [ ] |
| Key pages load correctly | [ ] |
| Modified features still work | [ ] |
| API endpoints respond correctly | [ ] |

**If any check fails, rollback the change and investigate before proceeding.**

---

## Reference Links

- [The Joy of React](https://separated-day-526.notion.site/The-Joy-Of-React-d234359051a44f2ca721bcb4c9ec5de5)
- [CSS for JS Devs](https://separated-day-526.notion.site/ea79a7c11e9940f9bd572a40dd1f8957)
- [Happy Practices](https://separated-day-526.notion.site/Happy-Practices-f494f1feedc1484f9c59510be5bebedf)
- [Deriving State](https://separated-day-526.notion.site/Deriving-State-db1c235e12464e80bc63d4bef2fd8bc0)
- [Principle of Least Privilege](https://separated-day-526.notion.site/Principle-of-Least-Privilege-2090f8f111e04f0abd4479c508bb570b)

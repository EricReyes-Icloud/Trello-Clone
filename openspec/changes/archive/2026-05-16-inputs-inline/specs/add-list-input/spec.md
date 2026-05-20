# SDD Spec: Add List Input — Maintain Current Behavior

## Domain
Adding new lists to the board

## Requirements

### Functional Requirements

#### FR-1: Input Behavior
- Input MUST remain as single-line text input (no textarea)
- Enter key MUST create the list
- Escape key MUST cancel and close the input

#### FR-2: Blur Behavior
- Blur event (click outside) MUST close input without creating list
- If input is empty when blurred, it MUST close without action
- If input has content when blurred, it MUST NOT create list (require explicit Enter)

#### FR-3: Styling
- Input MUST maintain current glassmorphism styling
- Input MUST maintain current dark theme compatibility
- Focus states MUST remain unchanged

### Non-Functional Requirements

#### NFR-1: Accessibility
- Input MUST have proper ARIA attributes for screen readers
- Focus MUST be automatically set when input appears
- Placeholder text MUST be descriptive

#### NFR-2: Performance
- Input appearance/disappearance MUST be instant
- No animation delays for add list workflow

## Scenarios

### Scenario 1: User adds list with Enter
**Given** User clicks "+ Añadir otra lista" button
**When** User types text and presses Enter
**Then** New list is created with the entered text
**And** Input closes
**And** Focus returns to the board

### Scenario 2: User cancels with Escape
**Given** User is typing in add list input
**When** User presses Escape key
**Then** Input closes immediately
**And** No list is created
**And** Text is discarded

### Scenario 3: User clicks outside empty input
**Given** User opened add list input but didn't type anything
**When** User clicks outside the input
**Then** Input closes immediately
**And** No list is created

### Scenario 4: User clicks outside with content
**Given** User typed text in add list input
**When** User clicks outside without pressing Enter
**Then** Input closes immediately
**And** No list is created
**And** Text is discarded

## Constraints

- MUST maintain existing add list button functionality
- MUST preserve existing add-list-input styling
- MUST work with existing BoardContext dispatch mechanism
- MUST not break existing list rendering on the board
- MUST maintain current glassmorphism aesthetic
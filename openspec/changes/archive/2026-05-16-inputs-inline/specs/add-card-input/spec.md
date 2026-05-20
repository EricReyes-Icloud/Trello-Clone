# SDD Spec: Add Card Input — Focus Enhancement

## Domain
Adding new cards to a list

## Requirements

### Functional Requirements

#### FR-1: Input Behavior
- Input MUST remain as single-line text input (no textarea)
- Enter key MUST create the card
- Escape key MUST cancel and close the input

#### FR-2: Blur Behavior
- Blur event (click outside) MUST close input without creating card
- If input is empty when blurred, it MUST close without action
- If input has content when blurred, it MUST NOT create card (require explicit Enter)

#### FR-3: Focus Visibility
- Focus state MUST have clearer visual indication
- Focus ring MUST be more prominent than current implementation
- Focus styles MUST match existing design system

### Non-Functional Requirements

#### NFR-1: Accessibility
- Input MUST have proper ARIA attributes for screen readers
- Focus MUST be automatically set when input appears
- Placeholder text MUST be descriptive

#### NFR-2: Performance
- Input appearance/disappearance MUST be instant
- No animation delays for add card workflow

## Scenarios

### Scenario 1: User adds card with Enter
**Given** User clicks "+ Añadir tarjeta" button
**When** User types text and presses Enter
**Then** New card is created with the entered text
**And** Input closes
**And** Focus returns to the list

### Scenario 2: User cancels with Escape
**Given** User is typing in add card input
**When** User presses Escape key
**Then** Input closes immediately
**And** No card is created
**And** Text is discarded

### Scenario 3: User clicks outside empty input
**Given** User opened add card input but didn't type anything
**When** User clicks outside the input
**Then** Input closes immediately
**And** No card is created

### Scenario 4: User clicks outside with content
**Given** User typed text in add card input
**When** User clicks outside without pressing Enter
**Then** Input closes immediately
**And** No card is created
**And** Text is discarded

## Constraints

- MUST maintain existing add card button functionality
- MUST preserve existing inline-input styling
- MUST work with existing BoardContext dispatch mechanism
- MUST not break existing card rendering in the list
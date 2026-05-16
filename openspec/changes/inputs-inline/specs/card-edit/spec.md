# SDD Spec: Card Edit — Textarea with Auto-resize

## Domain
Card editing inline behavior

## Requirements

### Functional Requirements

#### FR-1: Textarea Replacement
- The card edit mode MUST replace the current `<input type="text">` with a `<textarea>` element
- The textarea MUST support multi-line text input
- The textarea MUST auto-resize vertically based on content height using `scrollHeight`

#### FR-2: Keyboard Navigation
- Enter key MUST create a new line in the textarea (native textarea behavior)
- Ctrl+Enter MUST trigger save action
- Escape key MUST cancel editing and restore original card text
- Click outside the textarea MUST cancel editing (not save automatically)

#### FR-3: Explicit Save/Cancel Buttons
- Two buttons MUST be visible below the textarea:
  - Primary "Guardar" button (left)
  - Secondary "Cancelar" button (right)
- Clicking "Guardar" MUST save changes and exit edit mode
- Clicking "Cancelar" MUST discard changes and exit edit mode

#### FR-4: Visual Feedback
- On successful save, the textarea border MUST turn green for 0.5 seconds
- The success feedback animation MUST be implemented using CSS transitions

### Non-Functional Requirements

#### NFR-1: Accessibility
- The textarea MUST have proper ARIA attributes for screen readers
- Focus MUST be automatically set to the textarea when entering edit mode
- Button elements MUST have proper ARIA roles

#### NFR-2: Performance
- Auto-resize calculation MUST occur onChange without noticeable lag
- The resize operation MUST read scrollHeight and update height in a single render cycle

## Scenarios

### Scenario 1: User edits card text with multi-line content
**Given** User clicks on a card to edit
**When** User types multiple lines of text using Enter key
**And** User presses Ctrl+Enter
**Then** Card text is updated with all lines preserved
**And** Textarea shows green border briefly
**And** Card returns to view mode

### Scenario 2: User cancels edit using Escape
**Given** User is editing a card
**When** User presses Escape key
**Then** Edit mode exits immediately
**And** Original card text is restored
**And** No changes are saved

### Scenario 3: User clicks outside to cancel
**Given** User is editing a card
**When** User clicks anywhere outside the textarea
**Then** Edit mode exits immediately
**And** Original card text is restored
**And** No changes are saved

### Scenario 4: User saves using the Save button
**Given** User is editing a card
**When** User clicks the "Guardar" button
**Then** Card text is updated
**And** Textarea shows green border briefly
**And** Card returns to view mode

## Constraints

- MUST maintain existing card delete functionality
- MUST preserve existing card hover effects
- MUST work with existing BoardContext dispatch mechanism
- MUST not break existing card rendering in view mode
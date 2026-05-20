# SDD Spec: List Title Edit — Enhanced Input

## Domain
List title inline editing behavior

## Requirements

### Functional Requirements

#### FR-1: Input Selection
- When user clicks on list title, the input MUST automatically select all text
- The input MUST maintain single-line behavior (no multi-line support)

#### FR-2: Keyboard Navigation
- Enter key MUST save changes and exit edit mode
- Escape key MUST cancel editing and restore original title
- Blur event (click outside) MUST cancel editing without saving

#### FR-3: Delete Button
- The delete button (✕) MUST remain visible during title editing
- Clicking delete button MUST show confirmation dialog
- Confirmation MUST use browser's native confirm() for this phase

### Non-Functional Requirements

#### NFR-1: Accessibility
- Input element MUST have proper ARIA attributes
- Focus MUST be automatically set to the input when entering edit mode
- Delete button MUST have proper ARIA label

#### NFR-2: User Experience
- Text selection on focus MUST be immediate (no visible delay)
- Input styling MUST match existing list-title-input class

## Scenarios

### Scenario 1: User edits list title with auto-selection
**Given** User clicks on a list title
**When** Input appears
**Then** All text is automatically selected
**And** User can type immediately to replace title

### Scenario 2: User saves title with Enter
**Given** User is editing list title
**When** User presses Enter key
**Then** Title is updated
**And** Edit mode exits
**And** List header returns to normal state

### Scenario 3: User cancels with Escape
**Given** User is editing list title
**When** User presses Escape key
**Then** Edit mode exits immediately
**And** Original title is restored
**And** No changes are saved

### Scenario 4: User clicks outside to cancel
**Given** User is editing list title
**When** User clicks anywhere outside the input
**Then** Edit mode exits immediately
**And** Original title is restored
**And** No changes are saved

## Constraints

- MUST maintain existing delete list functionality
- MUST preserve existing list header layout
- MUST work with existing BoardContext dispatch mechanism
- MUST not break existing card rendering within the list
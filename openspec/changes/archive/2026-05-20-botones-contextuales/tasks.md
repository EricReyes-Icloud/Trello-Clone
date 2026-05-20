# Tasks: Botones Contextuales

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 240-375 |
| 400-line budget risk | **Medium** |
| Chained PRs recommended | **Yes** |
| Suggested split | PR 1 → PR 2 → PR 3 |
| Delivery strategy | ask-on-risk |

**Decision needed before apply:** Yes
**Chained PRs recommended:** Yes
**Chain strategy:** feature-branch-chain
**400-line budget risk:** Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Toast system + CSS button hierarchy | PR 1 | Base branch: main; includes new components and styling |
| 2 | Reducer integration + card toolbar | PR 2 | Depends on PR 1; implements undo logic and toolbar |
| 3 | List deletion + keyboard shortcut | PR 3 | Depends on PR 2; completes core functionality |

---

## Phase 1: Foundation

**Goal:** New components + CSS classes for button hierarchy and toast notifications.

- [x] 1.1 Create `Toast.jsx` in `src/components/ui/`
  - Implement ToastContainer and Toast components
  - Add undo functionality with 5-second timeout
  - Use `useState` for toast queue management

- [x] 1.2 Create `ContextualToolbar.jsx` in `src/components/ui/`
  - Implement toolbar with ⋮ icon and dropdown menu
  - Use `useRef` + `useEffect` for click-outside-to-close
  - Add Edit/Delete actions with proper event handlers

- [x] 1.3 Add CSS classes for button hierarchy to `App.css`
  - Add `.btn-primary`, `.btn-secondary`, `.btn-danger` classes
  - Extend existing `.btn` class for consistency
  - Add `.toast` and `.toolbar` classes for new components
  - Ensure uniform button heights and spacing

- [x] 1.4 Add `.feedback-success` class extension for undo success

---

## Phase 2: Reducer Integration

**Goal:** Add undo state and actions to the board reducer.

- [x] 2.1 Modify `boardReducer.js`
  - Add `pendingDeletion` field to state
  - Add `RESTORE_LIST` and `CONFIRM_DELETION` action types
  - Implement logic to preserve deleted list state temporarily

---

## Phase 3: Integration

**Goal:** Wire components, replace confirm() with toasts, and add keyboard shortcut.

### Card Integration

- [x] 3.1 Modify `card.jsx`
  - Add ContextualToolbar component to top-right corner
  - Integrate toast dispatch for delete action
  - Replace hover-based delete with toolbar action
  - Ensure toolbar visibility on all card states

### List Integration

- [x] 3.2 Modify `list.jsx`
  - Replace `confirm()` in `deleteList` with toast dispatch
  - Dispatch `DELETE_LIST` action immediately
  - Preserve list data in `pendingDeletion` state
  - Undo dispatches `RESTORE_LIST`, timeout dispatches `CONFIRM_DELETION`

### Board Integration

- [x] 3.3 Modify `board.jsx`
  - Add `useEffect` keydown listener for `Ctrl+L`
  - Prevent default browser behavior
  - Trigger list creation input on shortcut
  - Ensure shortcut works globally (except in text inputs)
  - Added `title="Ctrl+L"` tooltip for discoverability

---

## Phase 4: Verification

**Goal:** Manual testing of all scenarios from specs.

- [x] 4.1 Test Toast System
  - ✅ Toast appears on list deletion
  - ✅ Undo restores list within 5-second window
  - ✅ Auto-dismiss after timeout dispatches CONFIRM_DELETION
  - ✅ Multiple toasts stack correctly

- [x] 4.2 Test Contextual Toolbar
  - ✅ Toolbar visible on all cards
  - ✅ Menu opens/closes on click
  - ✅ Editar/Eliminar actions work
  - ✅ Touch-friendly tap targets

- [x] 4.3 Test Button Hierarchy
  - ✅ .btn-primary (gold), .btn-secondary (neutral), .btn-danger (red) present in CSS
  - ✅ Applied to Añadir tarjeta, Añadir lista, delete buttons
  - ⚠️ Disabled state styles not yet defined (minor)

- [x] 4.4 Test Keyboard Shortcut
  - ✅ Ctrl+L triggers list creation input
  - ✅ Works from any context (board, card)
  - ✅ Does not interfere with text inputs (INPUT/TEXTAREA check)

- [x] 4.5 Test Edge Cases
  - ✅ Empty card still shows toolbar
  - ✅ Consecutive deletions work independently
  - ✅ Undo failure — handled per-toast state

---

## Phase 5: Cleanup (Post-Verification)

- [x] 5.1 Add comments to new components
  - Key sections documented in Toast.jsx, ContextualToolbar.jsx, ToastContext.jsx

- [x] 5.2 Remove temporary debug logs
  - No debug logs were added during implementation

---

## Implementation Order

1. **Foundation Phase (PR 1):** New components and CSS are independent and can be tested in isolation.
2. **Reducer Phase (PR 2):** Depends on PR 1 for toast integration but can be tested with mock data.
3. **Integration Phase (PR 3):** Depends on PR 2 for undo logic and PR 1 for toast system.

### Why This Order?
- **Minimizes merge conflicts:** Foundation components are independent.
- **Early feedback:** CSS and toast system can be verified before wiring to existing components.
- **Modular testing:** Each PR has a clear scope and can be reviewed separately.

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| CSS conflicts | Use existing `.btn` class as base; test button hierarchy early |
| Undo state management | Use `pendingDeletion` field with `setTimeout` cleanup |
| Keyboard shortcut conflicts | Prevent default browser behavior; test in isolation |
| Toolbar visibility issues | Use absolute positioning; test on mobile |
| Toast stacking overflow | Limit max toasts; implement vertical stacking |

---

## Next Step

Ready for implementation (sdd-apply). **User must confirm chained PR strategy** before proceeding.
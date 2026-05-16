# Tasks: inputs-inline — Enhanced Inline Inputs

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~300-350 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Card Edit), PR 2 (List Title + Add Inputs) |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: Medium

---

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Card Edit: Replace input with auto-resizing textarea + buttons | PR 1 | Focus on core textarea logic, save/cancel buttons, and CSS classes. Base: feature/inputs-inline |
| 2 | List Title + Add Inputs: Refactor blur/cancel logic, enhance focus | PR 2 | Depends on PR 1 for CSS classes. Base: PR 1 branch |

---

## Phase 1: Core UI Refactoring (Card Edit)

### Card Edit Implementation
- [ ] **1.1** Replace `<input>` with `<textarea>` in `src/components/cards/card.jsx`:
  - Add `textarea-auto` CSS class for auto-resize using `scrollHeight`.
  - Bind `onChange` to update textarea value and trigger auto-resize.
  - Add `Save` and `Cancel` buttons below the textarea.

- [ ] **1.2** Implement `Ctrl+Enter` save logic in `src/components/cards/card.jsx`:
  - Prevent default `Enter` behavior (keep native newlines).
  - Add `onKeyDown` handler for `Ctrl+Enter` to dispatch `EDIT_CARD` action.

- [ ] **1.3** Add success feedback CSS in `src/App.css`:
  - Define `.feedback-success` for green border animation (0.5s).
  - Apply class on save via `setTimeout` cleanup.

- [ ] **1.4** Ensure Escape key cancels edit in `src/components/cards/card.jsx`:
  - Add `onKeyDown` handler for `Escape` to restore original text and exit edit mode.

- [ ] **1.5** Add ARIA attributes for accessibility:
  - Label textarea with `aria-label="Edit card text"`.
  - Label buttons with `aria-label="Save"` and `aria-label="Cancel"`.

---

## Phase 2: List Title & Add Inputs Enhancement

### List Title Edit
- [ ] **2.1** Update `src/components/lists/list.jsx` for list title edit:
  - Add `autoFocus` and `selectAll` to input on edit mode.
  - Ensure blur cancels edit (restore original title).

- [ ] **2.2** Keep delete button visible during edit in `src/components/lists/list.jsx`:
  - Ensure button remains rendered and functional.

- [ ] **2.3** Add ARIA attributes for list title input:
  - Label input with `aria-label="Edit list title"`.
  - Label delete button with `aria-label="Delete list"`.

### Add Card & Add List Inputs
- [ ] **2.4** Enhance focus visibility in `src/components/lists/list.jsx`:
  - Update add-card input CSS to use `focus-visible` for clearer focus state.

- [ ] **2.5** Ensure blur cancels add inputs in `src/components/lists/list.jsx`:
  - Add `onBlur` handlers to close inputs without side effects.

- [ ] **2.6** Add ARIA attributes for add inputs:
  - Label add-card input with `aria-label="Add new card"`.
  - Label add-list input with `aria-label="Add new list"`.

---

## Phase 3: Verification & Testing

### Manual Testing
- [ ] **3.1** Test card edit:
  - Verify textarea auto-resize on `onChange`.
  - Test `Ctrl+Enter` saves, `Escape` cancels, and blur cancels.
  - Verify green feedback on save.

- [ ] **3.2** Test list title edit:
  - Verify text auto-selects on focus.
  - Test `Enter` saves, `Escape` cancels, and blur cancels.
  - Verify delete button remains visible.

- [ ] **3.3** Test add card/input workflows:
  - Verify `Enter` creates, `Escape` cancels, and blur cancels.
  - Verify focus is visible and accessible.

- [ ] **3.4** Verify no regressions:
  - Ensure existing card/list rendering and delete functionality works.
  - Test keyboard navigation and BoardContext dispatch.

---

## Phase 4: Cleanup & Documentation

- [ ] **4.1** Update inline comments in modified files:
  - Add JSDoc for new handlers (e.g., `onKeyDown`, `onBlur`).

- [ ] **4.2** Remove temporary debug logs:
  - Clean up any `console.log` used during development.

---

## Implementation Order

1. **PR 1 (Card Edit)**: Focus on the most complex component (textarea + buttons + CSS). This includes core logic, accessibility, and visual feedback.
2. **PR 2 (List Title + Add Inputs)**: Depends on PR 1 for CSS classes. Refactor simpler components with clearer logic and fewer changes.

This order minimizes risk by addressing the most complex component first, ensuring foundational CSS and logic are in place before smaller tweaks.

---

**Next Step**: Ready for implementation. User must confirm chained PR strategy before proceeding with `sdd-apply`.
# Design: Inline Inputs Enhancement

## Technical Approach
The change replaces the existing single‑line edit inputs with a richer inline editing experience while preserving the current React + Context/Reducer architecture.
- **Card edit** – swap `<input type="text">` for an auto‑resizing `<textarea>`; add explicit **Guardar** and **Cancelar** buttons below and a temporary green border for visual feedback.
- **List title edit** – keep a single‑line `<input>` but enforce blur‐cancel semantics: clicking outside or pressing Escape discards changes.
- **Add‑card / Add‑list inputs** – remain single‑line. Blur closes the input without side effects; Escape cancels. Visual focus remains the same.
All interactions continue to dispatch the existing action types (`EDIT_CARD`, `EDIT_LIST`, `ADD_CARD`, `ADD_LIST`, etc.) through the `BoardContext`.

## Architecture Decisions
| Decision | Choice | Alternatives | Rationale |
|-----------|--------|---------------|------------|
| Card editing UX | Replace input with auto‑resizing textarea + explicit buttons | In‑place single‑line input with auto‑save on blur or `contenteditable` | Spec requires multi‑line, explicit save, and green feedback; textarea gives native multi‑line support and easier formatting.
| Blur behavior for title edit | Cancel on blur | Auto‑save on blur | Spec mandates cancel on blur; it keeps UI predictable.
| Delete button visibility | Always visible in list header | Show on hover | Spec requires always visible; fewer clicks for confirm.
| Focus management | autoFocus on edited inputs and add inputs | None | Improves keyboard usability and accessibility.

## Data Flow
```
User Interaction → Component Event → dispatch(action) → BoardReducer → Updated State → React Re‑render
```
All existing state shape is preserved; no schema migrations required.

## File Changes
| File | Action | Description |
|------|--------|-------------|
| `src/components/cards/card.jsx` | Modify | Replace edit mode input with `<textarea>`, add buttons, apply `feedback-success` class, handle explicit save/cancel.
| `src/components/lists/list.jsx` | Modify | Ensure title edit blur cancels, delete button always present, add focus handling for add‑card input.
| `src/App.css` | Modify | New CSS classes: `.textarea-auto`, `.btn-save`, `.btn-cancel`, `.feedback-success` + style adjustments for glassmorphism compatibility.

## Interfaces / Contracts
No new data contracts; all actions remain `EDIT_CARD`, `EDIT_LIST`, etc. The payloads are unchanged.

## Testing Strategy
| Layer | What to Test | Approach |
|------|-------------|---------|
| Manual UI | Card edit flow, list title edit, add‑card/add‑list inputs, delete buttons | Test all keyboard events (Enter, Esc, Ctrl+Enter) and blur/click outside scenarios per spec. Verify visual feedback, focus, and accessiblity attributes.

## Migration / Rollout
No data migration required. Changes are purely UI.

## Open Questions
- None.

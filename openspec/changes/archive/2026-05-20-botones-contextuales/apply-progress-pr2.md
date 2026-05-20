# Apply Progress: PR 2 — Reducer + Card Toolbar

## Status
Completed ✅

## Summary
Implemented Phase 2 (Reducer) and Phase 3 (Card Integration) tasks:
- Added `pendingDeletion` state to boardReducer with `RESTORE_LIST` and `CONFIRM_DELETION` actions
- Updated `boardContext.jsx` initial state with `pendingDeletion: {}`
- Integrated `ContextualToolbar` into `Card` component
- Replaced hover-based delete button with always-visible toolbar (⋮ menu with Editar/Eliminar)
- Added toast notification on card deletion via ToastContext

## Files Modified
- `src/reducers/boardReducer.js` — Added DELETE_LIST preservation, RESTORE_LIST, CONFIRM_DELETION
- `src/context/boardContext.jsx` — Added `pendingDeletion` to initial state
- `src/components/cards/card.jsx` — Added ContextualToolbar + useToast integration
- `src/App.jsx` — Fixed import (useToast from ToastContext, not Toast)

## Deviations from Design
- Card delete toast: shows notification without undo (undo for cards deferred — would require Card-specific restore logic not in scope)
- List undo mechanism (`pendingDeletion` in reducer) implemented as designed and ready for PR 3 integration

## Issues Found
- Build failed initially: wrong import path for useToast in App.jsx

## Next Steps
Proceed with PR 3: List deletion toast with undo + Ctrl+L keyboard shortcut.

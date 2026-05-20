# Design: Botones Contextuales

## Technical Approach
[Incremental approach: new Toast + ContextualToolbar components, modify existing components, no external deps]

## Architecture Decisions

### Decision: Toast System
**Choice**: useState‑based queue in a ToastContainer component at App root
**Alternatives considered**: Context‑based toast, external library
**Rationale**: Simple enough for current scope, no external deps needed, easy to migrate later

### Decision: ContextualToolbar
**Choice**: Render inline per‑card, visibility toggles via local state
**Alternatives considered**: Portal, context‑managed
**Rationale**: Each card owns its toolbar state; click‑outside‑to‑close via useRef + document listener

### Decision: Undo Mechanism
**Choice**: Preserve deleted list state in reducer with a pendingDeletion field + setTimeout cleanup
**Alternatives considered**: Separate undo stack context
**Rationale**: Keeps state colocated with existing reducer; simple temporary state

### Decision: Button Hierarchy CSS
**Choice**: .btn-primary (accent/gold), .btn-secondary (neutral), .btn-danger (red) extending base .btn class
**Rationale**: Minimal CSS changes, leverages existing .btn class

### Decision: Keyboard Shortcut Ctrl+L
**Choice**: useEffect with keydown listener on board container, e.preventDefault() to override browser
**Note**: Must NOT trigger when editing card textarea (check event target)

## Data Flow

[Show Toast flow and Toolbar flow]

## File Changes

| File | Action | Description |
|------|--------|-------------|
| src/components/ui/Toast.jsx | Create | Toast notification + undo |
| src/components/ui/ContextualToolbar.jsx | Create | Card toolbar (⋮ menu) |
| src/components/cards/card.jsx | Modify | Add toolbar, integrate toast on delete |
| src/components/lists/list.jsx | Modify | Replace confirm() with toast dispatch |
| src/components/board/board.jsx | Modify | Add Ctrl+L keydown listener |
| src/reducers/boardReducer.js | Modify | Add pendingDeletion / RESTORE_LIST / CONFIRM_DELETION |
| src/App.css | Modify | Add .btn-primary, .btn-secondary, .btn-danger, .toast styles |

## Testing Strategy
Manual: test each flow (toolbar open/close/action, toast undo/timeout, Ctrl+L, button hierarchy visual)
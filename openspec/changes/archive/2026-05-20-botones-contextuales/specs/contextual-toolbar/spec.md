# Contextual Toolbar Specification

## Purpose
Provide always-visible access to card actions (Edit/Delete) through a contextual toolbar, improving action discoverability and user experience.

## Requirements

### Requirement: Toolbar Visibility
The system MUST display a contextual toolbar on every card as a persistent UI element.

#### Scenario: Default visibility
- GIVEN a card is rendered in the board
- WHEN the card is in view
- THEN the toolbar icon (⋮) MUST be visible in the top-right corner
- AND the toolbar MUST NOT obstruct card content

#### Scenario: Multiple cards
- GIVEN multiple cards are present
- WHEN scrolling through the board
- THEN each card MUST have its own independent toolbar
- AND toolbars MUST remain visible regardless of scroll position

### Requirement: Action Menu
The system MUST provide Edit and Delete actions through the toolbar menu.

#### Scenario: Menu interaction
- GIVEN a card with toolbar visible
- WHEN user clicks the toolbar icon (⋮)
- THEN a dropdown menu MUST appear with "Editar" and "Eliminar" options
- AND the menu MUST position itself relative to the toolbar icon

#### Scenario: Menu dismissal
- GIVEN the toolbar menu is open
- WHEN user clicks outside the menu
- THEN the menu MUST close immediately
- AND focus MUST return to the toolbar icon

### Requirement: Mobile Compatibility
The system MUST ensure the toolbar remains usable on mobile devices.

#### Scenario: Touch interaction
- GIVEN a mobile device
- WHEN user taps the toolbar icon
- THEN the menu MUST open with touch-friendly spacing
- AND menu items MUST have minimum 44x44px tap targets

## Edge Cases

### Requirement: Empty Card State
The system MUST handle cards with no content appropriately.

#### Scenario: Empty card
- GIVEN a card with no title or description
- WHEN the card is rendered
- THEN the toolbar MUST still be visible and functional
- AND the toolbar MUST NOT overlap with card creation UI

### Requirement: Permission Handling
The system MUST gracefully handle permission restrictions.

#### Scenario: Read-only user
- GIVEN a user with read-only permissions
- WHEN the toolbar icon is clicked
- THEN the menu MUST show only available actions
- AND disabled actions MUST be visually indicated

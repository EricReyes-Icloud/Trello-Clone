# List Deletion Specification

## Purpose
Replace native confirm() dialogs with a more user-friendly toast notification system that provides undo functionality for list deletion actions.

## Requirements

### Requirement: Toast Replacement
The system MUST replace native confirm() dialogs with toast notifications for list deletion.

#### Scenario: List deletion flow
- GIVEN user initiates list deletion
- WHEN the delete button is clicked
- THEN a toast notification MUST appear instead of confirm() dialog
- AND the toast MUST contain deletion confirmation message

#### Scenario: Immediate visual feedback
- GIVEN list deletion is initiated
- WHEN the action is processed
- THEN the list MUST be visually removed immediately
- AND toast MUST appear simultaneously

### Requirement: Undo Capability
The system MUST provide undo functionality for deleted lists.

#### Scenario: Successful undo
- GIVEN a list has been deleted
- WHEN user clicks "Deshacer" in the toast
- THEN the list MUST be restored to its original position
- AND all cards within the list MUST be restored

#### Scenario: Undo timeout
- GIVEN a list deletion toast is visible
- WHEN 5 seconds elapse without undo
- THEN the deletion MUST become permanent
- AND the toast MUST dismiss automatically

### Requirement: State Management
The system MUST handle list deletion state appropriately.

#### Scenario: Pending deletion state
- GIVEN a list is deleted but within undo window
- WHEN the list is in pending deletion state
- THEN the list data MUST be preserved in memory
- AND the UI MUST show the deletion as reversible

### Requirement: Multiple List Handling
The system MUST handle multiple list deletions sequentially.

#### Scenario: Consecutive deletions
- GIVEN user deletes multiple lists quickly
- WHEN each deletion triggers a toast
- THEN each toast MUST have independent undo functionality
- AND undoing one MUST NOT affect others

## Edge Cases

### Requirement: Rapid Deletion Handling
The system MUST handle rapid list deletions gracefully.

#### Scenario: Quick successive deletions
- GIVEN user deletes lists in rapid succession
- WHEN multiple toasts appear
- THEN each MUST have its own 5-second timer
- AND timers MUST run independently

### Requirement: Empty List Deletion
The system MUST handle deletion of empty lists appropriately.

#### Scenario: Deleting empty list
- GIVEN a list with no cards
- WHEN user deletes the list
- THEN the same toast pattern MUST apply
- AND undo functionality MUST work identically

### Requirement: Permission Handling
The system MUST handle permission restrictions for list deletion.

#### Scenario: Read-only user attempt
- GIVEN a user with read-only permissions
- WHEN attempting to delete a list
- THEN no deletion MUST occur
- AND appropriate feedback MUST be provided

### Requirement: Undo Failure Recovery
The system MUST handle cases where undo cannot be completed.

#### Scenario: Undo operation fails
- GIVEN user attempts to undo list deletion
- WHEN the undo operation fails
- THEN the toast MUST show an error state
- AND provide clear error message to user

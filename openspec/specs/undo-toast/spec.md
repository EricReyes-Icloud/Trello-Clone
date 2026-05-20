# Undo Toast Specification

## Purpose
Provide a non-intrusive notification system with undo capability to replace native confirm() dialogs and improve user confidence.

## Requirements

### Requirement: Toast Display
The system MUST display toast notifications for user actions that can be undone.

#### Scenario: Successful list deletion
- GIVEN a user deletes a list
- WHEN the delete action is confirmed
- THEN a toast notification MUST appear
- AND the toast MUST contain the message "Lista eliminada"
- AND the toast MUST include an "Deshacer" button

#### Scenario: Toast positioning
- GIVEN multiple toasts could be displayed
- WHEN a new toast appears
- THEN it MUST be positioned in the bottom-right corner
- AND existing toasts MUST stack vertically
- AND the newest toast MUST appear at the top of the stack

### Requirement: Undo Functionality
The system MUST provide a time-limited undo capability.

#### Scenario: Undo within time window
- GIVEN a toast with undo option is visible
- WHEN user clicks "Deshacer" within 5 seconds
- THEN the original action MUST be reversed
- AND the toast MUST disappear immediately

#### Scenario: Undo timeout
- GIVEN a toast with undo option is visible
- WHEN 5 seconds elapse without user interaction
- THEN the undo option MUST become unavailable
- AND the toast MUST automatically dismiss

### Requirement: Visual Feedback
The system MUST provide clear visual feedback for toast states.

#### Scenario: Undo success
- GIVEN user clicks "Deshacer"
- WHEN the action is successfully reversed
- THEN the toast MUST show a success state briefly
- AND then dismiss automatically

### Requirement: Multiple Undo Support
The system MUST handle multiple undoable actions sequentially.

#### Scenario: Consecutive actions
- GIVEN user performs two delete actions quickly
- WHEN both actions trigger toasts
- THEN each toast MUST have independent undo functionality
- AND undoing one MUST NOT affect the other

## Edge Cases

### Requirement: Rapid Action Handling
The system MUST handle rapid user actions gracefully.

#### Scenario: Quick consecutive deletes
- GIVEN user deletes multiple items in quick succession
- WHEN toasts stack up
- THEN each toast MUST have its own 5-second timer
- AND timers MUST run concurrently

### Requirement: Undo Failure Handling
The system MUST handle cases where undo cannot be completed.

#### Scenario: Undo fails
- GIVEN user clicks "Deshacer" on a toast
- WHEN the undo operation fails
- THEN the toast MUST show an error state
- AND provide appropriate error message to user

### Requirement: Accessibility Compliance
The system MUST ensure toast notifications are accessible.

#### Scenario: Screen reader support
- GIVEN a toast notification appears
- WHEN using a screen reader
- THEN the toast message MUST be announced automatically
- AND the undo button MUST be focusable and labeled appropriately

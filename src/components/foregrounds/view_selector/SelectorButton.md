> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# SelectorButton Component Documentation

## Overview
The `SelectorButton` component renders an individual button within the ViewSelector that allows users to select a specific application view. It displays an icon representing the view and handles the click event to change the current view.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | The name of the view this button selects |
| `icon` | ReactNode | The icon element to display on the button |
| `setView` | function | Function to update the current view in the parent component |
| `setLoading` | function | Function to update the loading state in the parent component |

## Functionality

### Navigation
- Renders a clickable button for a specific application view
- Displays an icon that visually represents the view
- Handles click events to change the active view
- Triggers loading state when changing views

### Event Handling
- `handleClick` function processes click events
- Sets the active view to the one associated with this button
- Sets the loading state to true during view transition
- Provides a consistent interface for view switching

## UI Elements

### Container
- Chakra UI Box component with id "selector-button" for consistent styling
- Made clickable through the onClick handler
- Contains a centered icon element

### Icon Container
- Chakra UI Center component for proper alignment
- Fixed width of 80px for consistent button sizing
- Fixed height of 100% to fill the container
- Font size of 25px for proper icon sizing
- Cursor style set to "pointer" to indicate interactivity
- 10px padding around the icon for proper spacing

## Usage Example

```jsx
import React from 'react';
import SelectorButton from './components/foregrounds/view_selector/SelectorButton';

function ViewOption({ name, icon, onSelectView, onSetLoading }) {
  return (
    <SelectorButton 
      name={name}
      icon={icon}
      setView={onSelectView}
      setLoading={onSetLoading}
    />
  );
}
```

## Related Components

- **ViewSelector**: Parent component that contains multiple SelectorButtons
- **Foreground**: Higher-level component in the UI hierarchy

## Human Notes
No notes yet!
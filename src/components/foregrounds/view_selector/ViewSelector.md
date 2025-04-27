> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# ViewSelector Component Documentation

## Overview
The `ViewSelector` component displays a row of buttons that allow users to navigate between different views in the application. It renders a series of `SelectorButton` components with appropriate icons and names.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `setView` | function | Function to update the current view in the parent component |
| `setLoading` | function | Function to update the loading state in the parent component |

## Functionality

### Navigation
- Creates a horizontal navigation bar with buttons for each application view
- Maps view names to icons using Bootstrap Icons
- Passes view selection functionality to child components
- Centralizes view switching logic in one component

### View Management
- Defines available views in the application
- Associates each view with an appropriate icon
- Provides visual navigation for users to switch between views
- Passes state management functions to selector buttons

## UI Elements

### Container
- Chakra UI Box component with theme-aware styling
- Has the id "selector-button" for consistent styling
- Uses flex display with centered content
- Rounded corners with 10px border radius
- Hidden overflow for clean appearance

### Selector Buttons
- Generated dynamically from the views array
- Each button has an icon and view name
- Consistent styling and behavior across all view options
- Spaced evenly within the container

## View Options

The component currently supports the following views:
- **settings**: Settings interface (egg-fried icon)
- **schedule**: Schedule display (list icon)
- **clock**: Time display (clock icon)
- **countdown**: Event countdown (hourglass icon)
- **calendar**: Calendar display (calendar icon)

## Usage Example

```jsx
import React, { useState } from 'react';
import ViewSelector from './components/foregrounds/view_selector/ViewSelector';

function Navigation() {
  const [currentView, setCurrentView] = useState('clock');
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="navigation-container">
      <ViewSelector 
        setView={setCurrentView} 
        setLoading={setIsLoading} 
      />
      {/* View content would be rendered here based on currentView */}
    </div>
  );
}
```

## Related Components

- **SelectorButton**: Individual buttons within the ViewSelector
- **Foreground**: Parent component that contains the ViewSelector
- **Views**: Component that renders the selected view content

## Human Notes

No notes yet!
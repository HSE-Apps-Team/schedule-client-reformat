> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Views Component Documentation

## Overview
The `Views` component serves as a container for all the different view screens in the application. It conditionally renders the appropriate view component based on the current view state and manages loading states.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `view` | string | The name of the current view to display |
| `loading` | boolean | Whether the current view is in a loading state |
| `setLoading` | function | Function to update the loading state |

## Functionality

### View Management
- Acts as a router/view manager for the application
- Conditionally renders different content views based on the `view` prop
- Handles loading states with a loading animation
- Maintains consistent layout with fixed height sections

### Responsive Design
- Uses the `useMedia` hook to adapt the layout for different screen sizes
- Adjusts the loading indicator size based on device type
- Provides responsive layout for all contained view components

## UI Elements

### Container
- Full-height (100vh) Box component for the entire view area
- Three-section vertical layout: 10% top, 80% content, 10% bottom

### Loading Indicator
- Displays a Loading component when content is loading
- Rendered conditionally based on the loading state

### View Content
- Renders one of five possible view components based on the `view` prop:
  - **clock**: Time display and current period information
  - **countdown**: Event countdown timer
  - **calendar**: Calendar display
  - **schedule**: Schedule display for the current day
  - **settings**: Application settings interface

## Supported Views

The component currently supports the following views:
- **clock**: Shows the current time and period information
- **countdown**: Displays a countdown to important dates
- **calendar**: Shows calendar information and events
- **schedule**: Displays the daily schedule
- **settings**: Provides access to application settings

## Usage Example

```jsx
import React, { useState } from 'react';
import Views from './components/views/views';

function AppContent() {
  const [currentView, setCurrentView] = useState('clock');
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="app-content">
      <Views 
        view={currentView} 
        loading={isLoading} 
        setLoading={setIsLoading} 
      />
    </div>
  );
}
```

## Related Components

- **Clock**: Time display component
- **Countdown**: Event countdown component
- **Calendar**: Calendar display component
- **Schedule**: Daily schedule component
- **Settings**: Application settings component
- **Loading**: Loading animation component

## Human Notes

This component acts as the central view manager for the application. To add a new view, you'll need to:
1. Update the conditional rendering logic in this component
2. Add the corresponding view component in the views directory
3. Update the ViewSelector component to include the new view option

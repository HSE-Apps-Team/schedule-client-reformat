> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Loading Component Documentation

## Overview
The `Loading` component displays an animated loading indicator using the application logo. It creates a visually appealing rotation and scale animation to indicate that content is being loaded.

## Props

| Prop | Type | Description |
|------|------|-------------|
| None | | The component doesn't require props |

## Functionality

### Animation
- Uses Framer Motion to create smooth animations
- Implements a 360-degree rotation animation
- Applies scaling to control the logo size
- Sets opacity changes for a fade-in effect
- Configures animation timing and easing

### Visual Feedback
- Provides visual indication that content is loading
- Uses the application logo for brand consistency
- Creates a non-intrusive loading experience
- Infinite animation loop until loading completes

## UI Elements

### Container
- Div with class "loading-container" for proper positioning
- Contains the animated logo element

### Animated Logo
- Framer Motion div with class "logo"
- Initial state: invisible (opacity 0), no rotation, scaled down
- Animated state: visible (opacity 1), 360° rotation, scaled to 0.25
- Custom transition with 1-second duration
- Custom easing curve for smooth animation
- Separate opacity transition with delay for fade-in effect

### Logo Image
- Standard img element displaying "hseapps.png"
- Class "logo-image" for styling
- Alt text "hse schedule icon" for accessibility

## Animation Details

- **Duration**: 1 second per rotation
- **Easing**: Custom cubic bezier curve [0.25, 1, 0.25, 1]
- **Repeat**: Infinite (continues until component unmounts)
- **Scale**: Maintains 0.25 scale throughout animation
- **Opacity**: Fades in with 0.3s duration and 0.1s delay

## Usage Example

```jsx
import React, { useState } from 'react';
import Loading from './components/graphics/loading/loading';

function DataContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="content-container">
      {isLoading ? <Loading /> : <div className="content">Data loaded!</div>}
    </div>
  );
}
```

## Related Components

- **Views**: Parent component that conditionally renders the Loading component

## Human Notes

No notes yet!
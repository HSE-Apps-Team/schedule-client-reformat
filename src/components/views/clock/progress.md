> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Progress Component Documentation

## Overview
The `Progress` component renders a circular progress indicator that displays the time remaining in the current period during school hours. It calculates the progress percentage and renders appropriate text descriptions based on the current period context.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `genText` | function | Function that generates the formatted time text (e.g., "10:25") |
| `period` | object | The current period object containing timing information |
| `nextPeriod` | object | The next period in the schedule (can be null) |
| `lunchStatus` | function | Function that returns the lunch status ("DURING", "BEFORE", "AFTER") |
| `currentTime` | number | The current Unix timestamp in milliseconds |

## Functionality

### Responsive Design
- Uses the `useMedia` hook to adapt font sizes for mobile and desktop views
- Mobile view: Font sizes are proportional to window width
- Desktop view: Font sizes are proportional to window height

### Lunch Period Handling
- Retrieves lunch configuration from settings (Royal/Gray day and lunch period A/B/C/D)
- Special handling for lunch periods that split a regular class period
- Calculates progress differently based on whether the user is before, during, or after their lunch period

### Progress Calculation
- Calculates percentage completion of the current period or lunch segment
- For regular periods: (currentTime - periodStart) / (periodEnd - periodStart)
- For lunch periods: Adapts formula based on lunch status (BEFORE/DURING/AFTER)

### UI Text Generation
- Displays countdown timer in large text
- Shows contextual description below the timer that changes based on period type:
  - During regular periods: "Until [periodName] Ends"
  - Before lunch: "Until [lunchLetter] Lunch"
  - During lunch: "Until Lunch Ends"
  - After lunch but still in the period: "Until [periodName] Ends"
  - Last period of the day: "Until School Ends"

## UI Elements

### Circular Progress
- Uses Chakra UI's `CircularProgress` component
- Progress track uses theme colors for consistent styling
- Size adapts to viewport dimensions
- Rounded caps for a more polished appearance

### Timer Text
- Displays remaining time in HH:MM:SS format (hours only shown when > 0)
- Font size scales with viewport dimensions
- Centered within the circular progress indicator

### Context Label
- Explains what the timer is counting down to
- Smaller font size below the timer
- Dynamically changes based on period context

## Usage Example

```jsx
import React from 'react';
import Progress from './progress';

function ProgressExample({ currentPeriod, nextPeriod }) {
  const getCurrentTime = () => Date.now();
  
  const generateTimeText = () => {
    // Format time remaining as string
    return "10:45";
  };
  
  const getLunchStatus = () => {
    // Determine lunch status
    return "BEFORE";
  };
  
  return (
    <Progress
      genText={generateTimeText}
      period={currentPeriod}
      nextPeriod={nextPeriod}
      lunchStatus={getLunchStatus}
      currentTime={getCurrentTime()}
    />
  );
}
```

## Human Notes

From Nic, I mean it only works with clock, used by clock, sets up circular progress bar, I think it handles some cases and not all, and they share functionality on some stuff. Good luck
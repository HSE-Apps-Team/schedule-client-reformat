> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Countdown Component Documentation

## Overview
The `Countdown` component displays a large, animated countdown timer to a specific event or date. It features a title at the top, an animated flip-style timer in the center, and labels for days, hours, minutes, and seconds below.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `loading` | boolean | Indicates whether the data is currently being loaded |
| `setLoading` | function | Callback function to update the loading state |
| `view` | string | The current view name, passed to child components |

## Functionality

### Data Fetching
- Fetches countdown target data using the `getClock()` function from the API
- Retrieves the end date and event title from the API response
- Converts the end date to ISO format for use with the countdown timer

### State Management
- Tracks the countdown end date in the `endDate` state
- Stores the event title in the `name` state
- Handles loading states throughout the data fetching process

### Responsive Design
- Uses the `useMedia` hook to adjust styling for mobile and desktop views
- Mobile view (< 750px): Uses smaller font sizes for the title
- Desktop view (≥ 750px): Uses larger font sizes for better visibility

## UI Elements

### Event Title
- Displays at the top of the component
- Font size adapts to screen size (3xl for mobile, 6xl for desktop)
- Centered alignment with padding below

### Countdown Timer
- Uses the `Flip` component to display an animated countdown
- Shows days, hours, minutes, and seconds remaining until the target date
- Animated flip effect when digits change

### Labels
- Text labels for "Days", "Hours", "Minutes", and "Seconds"
- Positioned below the Flip component
- Evenly spaced in a row with equal width (25% each)
- Font size scales with viewport width (3vw)

## Usage Example

```jsx
import React, { useState } from 'react';
import Countdown from './countdown';

function CountdownContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="countdown-container">
      <Countdown 
        loading={isLoading} 
        setLoading={setIsLoading}
        view="countdown"
      />
    </div>
  );
}
```

## Expected API Response Format

The component expects the API to return data in the following format:

```json
{
  "data": {
    "title": "Next School Break",
    "End_Date": "2024-12-25T00:00:00.000Z"
  }
}
```

## Implementation Notes

The component includes commented-out code showing an alternative implementation approach. The current implementation:

1. Uses async/await for cleaner API request handling
2. Properly formats the date as an ISO string
3. Includes error handling for the API request
4. Organizes the UI with flexbox for better alignment

## Human Notes

From Nic, it does practically nothing, its just Nic being a good React boy, and makes it organized. It makes sure that we didn't throw anything anywhere like the devs before us. 
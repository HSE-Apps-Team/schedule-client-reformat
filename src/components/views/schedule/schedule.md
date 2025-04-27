> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Schedule Component Documentation

## Overview
The `Schedule` component displays the daily class schedule with periods, times, and lunch options. It highlights the current lunch period based on user settings and provides a responsive interface for viewing the day's schedule.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `overrideLunch` | boolean | If true, overrides the user's lunch period selection |
| `loading` | boolean | Indicates whether the data is currently being loaded |
| `setLoading` | function | Callback function to update the loading state |

## Functionality

### Data Fetching
- Fetches schedule data using the `getSchedule()` function from the API
- Handles both regular and special schedule types
- Sets loading state during data retrieval

### Lunch Period Handling
- Retrieves the user's lunch preference from local storage
- Determines the appropriate lunch period based on the day type (Royal/Gray)
- Highlights the user's lunch period in the display
- Supports lunch period overrides

### Responsive Design
- Uses the `useMedia` hook to adapt layout for different screen sizes
- Mobile view: Vertical layout for lunch periods
- Desktop view: Horizontal layout for lunch periods
- Adjusts text sizes and element dimensions based on viewport

## UI Elements

### Day Type Indicator
- Displays whether today is a Royal/Blue or Gray day
- Uses appropriate color coding
- Centered at the top of the component

### Period Cards
- Each period is displayed in a card with motion effects
- Shows period name and time range
- Excludes passing periods from display
- Hover animation shifts cards to the right

### Lunch Period Cards
- Smaller cards nested under a class period with lunch
- Displays each lunch option (A, B, C, D)
- Highlights the user's assigned lunch period
- Shows start and end times for each lunch option

### Pathways Period Cards
- Similar to lunch cards but for pathways periods
- Displays pathway options when available
- Shows start and end times for each pathway option

## Usage Example

```jsx
import React, { useState } from 'react';
import Schedule from './components/views/schedule/schedule';

function ScheduleContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="content-container">
      <Schedule 
        loading={isLoading} 
        setLoading={setIsLoading} 
        overrideLunch={false} 
      />
    </div>
  );
}
```

## Expected Data Format

The component expects the schedule data in the following format:

```json
{
  "data": {
    "Type": "Regular" | "Special",
    "data": [
      {
        "periodName": "Period 1",
        "startTime": "8:30 AM",
        "endTime": "9:20 AM"
      },
      {
        "periodName": "Period 5",
        "startTime": "11:30 AM",
        "endTime": "1:30 PM",
        "lunchPeriods": {
          "A": { "startTime": "11:30 AM", "endTime": "12:00 PM" },
          "B": { "startTime": "12:00 PM", "endTime": "12:30 PM" },
          "C": { "startTime": "12:30 PM", "endTime": "1:00 PM" },
          "D": { "startTime": "1:00 PM", "endTime": "1:30 PM" }
        }
      },
      {
        "periodName": "Pathways",
        "startTime": "2:30 PM",
        "endTime": "3:30 PM",
        "pathwaysPeriods": {
          "Odd": { "startTime": "2:30 PM", "endTime": "3:00 PM" },
          "Even": { "startTime": "3:00 PM", "endTime": "3:30 PM" }
        }
      }
    ]
  }
}
```

## Related Components

- **Views**: Parent component that conditionally renders the Schedule
- **Clock**: Component that shows the current period status

## Human Notes

The Schedule component provides a visual representation of the day's classes and special periods. It's designed to be responsive and highlight the user's lunch period based on their settings. The component handles both regular schedules and special schedules through the same interface.

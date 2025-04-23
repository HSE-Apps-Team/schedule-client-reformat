> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Clock Component Documentation

## Overview
The `Clock` component displays a countdown timer during school hours, showing the time remaining in the current period. Outside of school hours, it displays the current time and a "No School" message.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `loading` | boolean | Indicates whether the data is currently being loaded |
| `setLoading` | function | Callback function to update the loading state |

## Functionality

### Data Fetching
- Fetches schedule data using the `getSchedule()` function from the API
- Transforms time strings into Unix timestamps for easier calculations
- Handles special schedules and events differently from regular schedules

### Time Management
- Uses the `dayjs` library for time calculations and formatting
- Updates the current time every 500ms with an interval
- Calculates the time remaining in the current period
- Formats countdown display with hours (when applicable), minutes, and seconds

### Period Tracking
- Determines the current status based on time: before school, during school, after school
- Identifies the current period by comparing the current time against period start and end times
- Tracks the next period to provide context in the UI

### Status Handling
- `LOADING`: Initial state while fetching data
- `BEFORE_SCHOOL`: When current time is before the first period starts
- `SCHOOL_NOW`: When current time is within a school period
- `AFTER_SCHOOL`: When current time is after the last period ends
- `NO_SCHOOL`: When the schedule array is empty (no school day)

## UI Elements

### During School Hours
- Displays a circular progress timer via the `Progress` component
- Shows time remaining in the current period
- Displays contextual information about the current period

### Outside School Hours
- Shows the current time in hours:minutes AM/PM format
- Displays a "No School Currently" message or a custom message from the API

## Usage Example

```jsx
import React, { useState } from 'react';
import Clock from 'path/to/clock';

function ClockContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div>
      <h1>School Clock</h1>
      <Clock 
        loading={isLoading} 
        setLoading={setIsLoading} 
      />
    </div>
  );
}
```

## Expected Schedule Data Format

The component expects the API to return schedule data in the following format:

```json
{
  "data": {
    "Type": "Regular" | "Special",
    "data": [
      {
        "periodName": "Period 1",
        "startTime": "8:30 AM",
        "endTime": "9:20 AM",
        "lunchPeriods": {
          "A": {
            "startTime": "11:30 AM",
            "endTime": "12:00 PM"
          },
          "B": {
            "startTime": "12:00 PM",
            "endTime": "12:30 PM"
          }
          // Additional lunch periods...
        }
      },
      // Additional periods...
    ],
    "EventData": {
      "NoSchoolText": "Spring Break - No School"  // Only present for Special type
    }
  }
}
```

## Related Components

- **Progress.jsx**: Handles the circular progress display and formatting of the timer
- **getLunch**: API function that provides lunch period status information

## Human Notes

From Nic, Clock is the main thing we do, so keeping that running is otp priority. Its really simple, using chakra's circular progress, using the timer. It's a lot of spaghetti code, and we don't really know what it all does, and its fairly easy to design except for colors. 

`Progress.jsx` makes the progress bar and adds the text. This file does time countdown and stuff like that.  


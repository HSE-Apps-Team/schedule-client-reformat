> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Calendar Component Documentation

## Overview
The `CalendarSelector` component displays a set of calendars in a tabbed interface. It fetches calendar data from an API and allows users to switch between different calendars by clicking on tabs.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `loading` | boolean | Indicates whether the data is currently being loaded |
| `setLoading` | function | Callback function to update the loading state |

## Functionality

### Data Fetching
- Fetches calendar data using the `getCalendar2()` function from the API
- Handles loading states and errors during data fetching
- Expects an array of calendar objects in the response's `data` property

### State Management
- Maintains a list of calendars in the `calendars` state
- Tracks the currently selected calendar with `selectedCalendarIndex` state
- Updates the selected calendar when a tab is clicked

### Responsive Design
- Uses the `useMedia` hook to adapt layout for mobile and desktop views
- Mobile view (< 750px): Component width is 90% of the container
- Desktop view (≥ 750px): Component width is 50% of the container

## UI Elements

### Container
- A scrollable box with hidden scrollbars
- Height fixed at 85vh (85% of viewport height)

### Tabs
- Lazy-loaded tabs with unstyled variant
- Each tab represents a calendar and displays the calendar's name
- Custom styling for active tabs

### Content
- Displays the calendar image (`imgUrl`) for the selected calendar
- Images are responsive and have rounded corners

## Usage Example

```jsx
import React, { useState } from 'react';
import CalendarSelector from 'path/to/calendar';

function CalendarContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div>
      <h1>Organization Calendars</h1>
      <CalendarSelector 
        loading={isLoading} 
        setLoading={setIsLoading} 
      />
    </div>
  );
}
```

## Expected Data Format

The component expects the API to return data in the following format:

```json
{
  "data": [
    {
      "_id": "calendar1",
      "name": "Calendar Name",
      "imgUrl": "https://example.com/calendar-image.jpg"
    },
    // Additional calendar objects...
  ]
}
```

## Human Notes

According to Nic, the designing is very annoying. This way made to specifcally fit allowing new calendars ontop of previous functionality of just displaying one image calendar. 

This is going through HSE Admin and HSE Schedule API, so make sure changes are good for everything. 
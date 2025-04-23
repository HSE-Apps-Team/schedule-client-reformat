> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Flip Component Documentation

## Overview
The `Flip` component implements an animated flip-clock style countdown timer using the `@pqina/flip` library. It displays days, hours, minutes, and seconds in a flipping card animation style reminiscent of old airport departure boards.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `to` | string/Date | Target date/time the countdown is counting down to (ISO string format) |
| `loading` | boolean | Indicates whether parent components are still loading |
| `setLoading` | function | Callback function to update the loading state |

## Functionality

### Tick Library Integration
- Uses the `@pqina/flip` library to create the flip animation effect
- Initializes the Tick DOM element with the `didInit` callback
- Sets up a countdown to the target date with the specified format (`['d', 'h', 'm', 's']`)
- Updates the display when the countdown value changes

### State Management
- Maintains the countdown value in the `tickValue` state (initialized as "0000")
- Uses refs (`divRef` and `tickRef`) to access and update the Tick DOM instance
- Properly cleans up the Tick DOM instance on unmount with `Tick.DOM.destroy()`

### Component Lifecycle
- First useEffect: Creates the Tick DOM instance and sets up cleanup
- Second useEffect: Configures the countdown with format and update handler
- Third useEffect: Updates the Tick value whenever `tickValue` state changes

## UI Elements

### Flip Cards
- Each digit is displayed in a separate flip card
- Cards have a transparent background with subtle styling adjustments
- Custom CSS eliminates default shadows and adjusts card dimensions

### Layout
- Container width is set to 70vw (70% of viewport width)
- All elements are centered using flexbox
- Parent container in the Countdown component adds labels underneath

## Styling

The component includes extensive CSS customization of the Tick library:

- Removes default shadows and borders for a cleaner look
- Adjusts spacing and sizing for consistent display across devices
- Hides the Tick credits that would normally appear
- Sets proper line height and text alignment for the digits

## Implementation Notes

The component code includes a commented-out previous implementation that used a different approach. The current implementation:

1. Uses three separate useEffect hooks for better separation of concerns
2. Properly handles component cleanup to prevent memory leaks
3. Maintains a separate state for the tick value

## Human Notes

The Flip component creates the visually distinctive countdown timer used for special events:

- The animation is very CPU-intensive, so be mindful when making changes
- The current implementation doesn't handle the labels within the component itself
- Instead, labels (Days, Hours, Minutes, Seconds) are added by the parent Countdown component
- There are two implementations in the code - the current one and a commented-out older version
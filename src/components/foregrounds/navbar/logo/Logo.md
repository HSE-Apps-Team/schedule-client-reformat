> **Disclaimer:** This documentation was initially generated with AI assistance and may require human review and adjustments.

# Logo Component Documentation

## Overview
The `Logo` component displays the application's branding, consisting of an icon and the text "HSE Schedule". It provides a link back to the application's homepage.

## Functionality

### Branding
- Displays the application icon ("hseapps.png")
- Shows the application name ("HSE Schedule")
- Creates a consistent visual identity for the application

### Navigation
- Wraps the logo in an anchor tag pointing to "hseschedule.app"
- Provides a way for users to return to the application's homepage
- Functions as a home button within the navigation interface

## UI Elements

### Container
- Chakra UI Box component with flex display
- Row direction with centered alignment
- Contains both the icon and text elements

### Icon
- Image component displaying "hseapps.png"
- Fixed width of 40px
- Positioned on the left side of the logo

### Text
- Text component displaying "HSE Schedule"
- Font weight of 550 (semi-bold)
- Font size of 2xl
- Left padding of 10px to separate from the icon

## Usage Example

```jsx
import React from 'react';
import Logo from './components/foregrounds/navbar/logo/Logo';

function Header() {
  return (
    <header className="app-header">
      <div className="navbar">
        <Logo />
        {/* Other navbar elements */}
      </div>
    </header>
  );
}
```

## Related Components

- **Navbar**: Parent component that contains the Logo
- **SettingsButton**: Companion component in the Navbar

## Human Notes

No notes yet!
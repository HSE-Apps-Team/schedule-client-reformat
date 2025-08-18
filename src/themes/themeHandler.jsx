import React, { createContext, useState, useContext, useEffect } from 'react';

import { useColorMode } from '@chakra-ui/react';

import { useSettings } from '../hooks/useSettings';

// This theme provider implements a simple theme switching mechanism that can be expanded to support additional themes 
// beyond just light and dark. 
// It works alongside the CSS variables defined in theme.css but doesn't automatically apply the theme to the DOM  
// components using the theme need to handle that aspect.

// in other words, i have no idea what this does either but it works! Thank Nic


// const ThemeContext = createContext();

const ThemeHandler = ({ children }) => {

  const { settings } = useSettings();

  useEffect(() => {
    if (settings.themeMode === "dark" && settings.themeStyle === "normal") {
      document.documentElement.setAttribute('data-theme', "dark");
    }
    else if (settings.themeMode === "dark" && settings.themeStyle === "earth tones") {
      document.documentElement.setAttribute('data-theme', "dark-earth-tones");
    }
    else if (settings.themeMode === "light" && settings.themeStyle === "earth tones") {
      document.documentElement.setAttribute('data-theme', "earth-tones");
    }
    else {
      document.documentElement.setAttribute('data-theme', "light-normal");
    }

  }, [settings]);

  return children;
};

export default ThemeHandler;
// export const useTheme = () => useContext(ThemeContext);
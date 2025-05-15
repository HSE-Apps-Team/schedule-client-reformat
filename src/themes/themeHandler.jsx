import React, { createContext, useState, useContext, useEffect } from 'react';

import { useSettings } from '../hooks/useSettings';

// const ThemeContext = createContext();

const ThemeHandler = ({ children }) => {

  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  return children;
};

export default ThemeHandler;
// export const useTheme = () => useContext(ThemeContext);
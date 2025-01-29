import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './hooks/useSettings';

import { ChakraProvider } from '@chakra-ui/react'; // provider allows access to chakra components

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SettingsProvider>
  </React.StrictMode>
);

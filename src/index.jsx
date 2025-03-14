import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './hooks/useSettings';
import { ThemeProvider } from './themes/themeProvider';
import { ChakraProvider } from '@chakra-ui/react'; // provider allows access to chakra components


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <ThemeProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </ThemeProvider>
        </SettingsProvider>
    </React.StrictMode>
);

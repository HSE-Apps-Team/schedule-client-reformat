import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsProvider } from './hooks/useSettings';
import ThemeHandler from './themes/themeHandler'; // theme handler to manage themes
import { ChakraProvider } from '@chakra-ui/react'; // provider allows access to chakra components
import colorScheme from './themes/colorScheme';
import { DeviceTypeProvider } from './hooks/useDeviceType';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <DeviceTypeProvider>
            <ThemeHandler>
                <ChakraProvider theme={colorScheme}>
                    <App />
                </ChakraProvider>
            </ThemeHandler>
        </DeviceTypeProvider>
    </SettingsProvider>
</React.StrictMode>
);

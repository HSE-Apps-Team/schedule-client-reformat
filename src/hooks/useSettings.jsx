import React, { createContext, useContext, useState, useEffect } from "react";

const defaultSettings = {
    darkmode: false,
    royalLunch: "A",  // Old setting key
    grayLunch: "A",   // Old setting key
    blueDayLunch: "a", // New setting key (lowercase to match the settings UI)
    grayDayLunch: "a", // New setting key (lowercase to match the settings UI)
    snow: true,
    theme: "dark",
    seniorPrank: false,
    confetti: true
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const storedSettings = localStorage.getItem("settings");
        return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    };

    return (  
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};


export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};

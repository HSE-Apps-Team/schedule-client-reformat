import React, { createContext, useContext, useState, useEffect } from "react";

// This makes a really good version of settings 
// so that you can just call the hook, get the settings object, and get settings immediately. 
// This is so you dont have to interface with the ever changing localStorage
// When you add things you will thank me later!

const defaultSettings = {
    // darkmode: false,
    // royalLunch: "A",  // Old setting key
    // grayLunch: "A",   // Old setting key
    blueDayLunch: "a", // New setting key (lowercase to match the settings UI)
    grayDayLunch: "a", // New setting key (lowercase to match the settings UI)
    snow: true, //for winter
    themeMode: "dark",
    themeStyle: "normal", // 
    seniorPrank: false, // for end of school
    confetti: true, // for end of school
    showTimerInTitle: false, // for showing timer in title
    weatherEffects: false
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

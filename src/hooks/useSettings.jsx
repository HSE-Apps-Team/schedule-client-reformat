import React, { createContext, useContext, useState, useEffect } from "react";
import { getClock } from "../api/api";

// This makes a really good version of settings 
// so that you can just call the hook, get the settings object, and get settings immediately. 
// This is so you dont have to interface with the ever changing localStorage
// When you add things you will thank me later!

const defaultSettings = {
    // darkmode: false,
    // royalLunch: "A",  // Old setting key
    // grayLunch: "A",   // Old setting key
    // blueDayLunch: "a", // commented out for 4 to 3 lunch switch
    // grayDayLunch: "a", // commented out for 4 to 3 lunch switch
    blueDayLunch: "b", // New setting key (lowercase to match the settings UI)
    grayDayLunch: "b", // New setting key (lowercase to match the settings UI)
    snow: true, //for winter
    themeMode: "dark",
    themeStyle: "normal", //
    seniorPrank: false, // for end of school
    showTimerInTitle: false, // for showing timer in title
    weatherEffects: false
};

// commented out for 4 to 3 lunch switch: "a" is no longer a valid lunch letter,
// so any user with a previously stored "a" is migrated to "b" below.
const migrateLunchLetter = (lunch) => (lunch === "a" ? "b" : lunch);

const sanitizeSettings = (storedSettings = {}) => {
    const { confetti: _confetti, ...rest } = storedSettings;
    const merged = {
        ...defaultSettings,
        ...rest,
    };
    return {
        ...merged,
        blueDayLunch: migrateLunchLetter(merged.blueDayLunch),
        grayDayLunch: migrateLunchLetter(merged.grayDayLunch),
    };
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const storedSettings = localStorage.getItem("settings");
        return storedSettings ? sanitizeSettings(JSON.parse(storedSettings)) : defaultSettings;
    });
    const [breakClockConfetti, setBreakClockConfetti] = useState(false);

    useEffect(() => {
        const syncBreakClock = async () => {
            try {
                const response = await getClock();
                const endDate = response?.data?.End_Date;

                if (!endDate) {
                    setBreakClockConfetti(false);
                    return;
                }

                setBreakClockConfetti(Date.now() >= new Date(endDate).getTime());
            } catch (error) {
                console.error(error);
            }
        };

        syncBreakClock();
        const intervalId = setInterval(syncBreakClock, 15000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings((prevSettings) => {
            const { confetti: _confetti, ...safeSettings } = newSettings;
            return sanitizeSettings({ ...prevSettings, ...safeSettings });
        });
    };

    return (  
        <SettingsContext.Provider value={{ settings, updateSettings, breakClockConfetti, setBreakClockConfetti }}>
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

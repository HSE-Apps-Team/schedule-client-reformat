import React from "react";

import { Box } from "@chakra-ui/react";
import Confetti from "../../../graphics/confetti/confetti";
import { useSettings } from "../../../../hooks/useSettings";
import Weather from "../../../graphics/weather/WeatherBackground";

// adds themes in the background, so that it will look cool

const ThemeEffect = ( props ) => {
    const { settings, breakClockConfetti } = useSettings();
    return (
        <Box height="100%" width="100%">
            
            {breakClockConfetti && <Confetti />}
            {settings.weatherEffects && <Weather />}
            {/* {<Weather />} */}
        </Box>
    );
};

export default ThemeEffect;
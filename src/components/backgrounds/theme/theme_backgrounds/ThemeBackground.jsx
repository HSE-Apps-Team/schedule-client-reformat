import React, { useEffect } from "react";
import { useSettings} from "../../../../hooks/useSettings";

import { Box } from "@chakra-ui/react";

import useMedia from "../../../../hooks/useMedia";

const ThemeBackground = () => {
    const { settings } = useSettings();
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    useEffect(() => {
        console.log(settings?.seniorPrank);
    }
    , [settings?.seniorPrank]);

    return (
        <Box 
            height="100vh" 
            width="100vw" 
            // bgImg={mobile ? settings?.seniorPrank ? "/gigachad.gif" : null : settings?.seniorPrank ? "/miku.png" : null} 
            backgroundSize="cover"
            onError={(e) => {
                e.target.style.backgroundImage = 'none';
            }}
        />
    );

};

export default ThemeBackground;
import React, { useEffect } from "react";
import { useSettings} from "../../../../hooks/useSettings";

import { Box } from "@chakra-ui/react";

const ThemeBackground = () => {
    const { settings } = useSettings();
    useEffect(() => {
        console.log(settings?.seniorPrank);
    }
    , [settings?.seniorPrank]);

    return (
        <Box 
            height="100vh" 
            width="100vw" 
            bgImg={settings?.seniorPrank ? "https://storage.ko-fi.com/cdn/useruploads/display/d8ae04ae-c228-4284-860d-243b4c954c56_39wallpaper.png" : null} 
            backgroundSize="cover"
            onError={(e) => {
                e.target.style.backgroundImage = 'none';
            }}
        />
    );

};

export default ThemeBackground;
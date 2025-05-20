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
            bgImg={mobile ? settings?.seniorPrank ? "https://i.pinimg.com/originals/28/27/77/2827771068d374a49d2c0fa49d30967d.gif" : null : settings?.seniorPrank ? "https://storage.ko-fi.com/cdn/useruploads/display/d8ae04ae-c228-4284-860d-243b4c954c56_39wallpaper.png" : null} 
            backgroundSize="cover"
            onError={(e) => {
                e.target.style.backgroundImage = 'none';
            }}
        />
    );

};

export default ThemeBackground;
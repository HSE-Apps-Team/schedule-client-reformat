import React from "react";

import { Box } from "@chakra-ui/react";

import ThemeBackground from "./theme_backgrounds/ThemeBackground";
import ThemeEffect from "./theme_effects/ThemeEffect";

// another piece of react bloat
// but this adds themes in the background, so that it will look cool

const Theme = () => {
    return (
        <Box>
            <ThemeEffect/>
            <ThemeBackground />
        </Box>
    );
};

export default Theme;
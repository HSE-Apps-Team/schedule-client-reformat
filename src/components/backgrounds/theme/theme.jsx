import React from "react";

import { Box } from "@chakra-ui/react";

import ThemeBackground from "./theme_backgrounds/ThemeBackground";
import ThemeEffect from "./theme_effects/ThemeEffect";

const Theme = () => {
    return (
        <Box>
            <ThemeEffect/>
            <ThemeBackground />
        </Box>
    );
};

export default Theme;
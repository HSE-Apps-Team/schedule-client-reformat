import React from "react";

import { Box } from "@chakra-ui/react";
import Confetti from "../../../graphics/confetti/confetti";
import { useSettings } from "../../../../hooks/useSettings";

const ThemeEffect = ( props ) => {
    const { settings } = useSettings();
    return (
        <Box height="100%" width="100%">
            {settings.confetti && <Confetti />}
        </Box>
    );
};

export default ThemeEffect;
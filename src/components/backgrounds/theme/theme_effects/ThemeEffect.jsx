import React from "react";

import { Box } from "@chakra-ui/react";
import Confetti from "../../../graphics/confetti/confetti";

const ThemeEffect = ( props ) => {
    return (
        <Box height="100%" width="100%">
            {props.confetti && <Confetti />}
        </Box>
    );
};

export default ThemeEffect;
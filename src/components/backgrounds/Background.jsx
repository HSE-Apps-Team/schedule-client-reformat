import React from "react";

import { Box } from "@chakra-ui/react";

import Theme from "./theme/theme";

// creates background for display. See foreground for the horror that was the previous implementation.

// You will thank us later, your welcome.

const Background = ( props ) => {
    return (
        <Box id="component">
            <Theme/>
        </Box>
    );
};

export default Background;
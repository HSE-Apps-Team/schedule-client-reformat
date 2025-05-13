import React from "react";

import { Box } from "@chakra-ui/react";

import Theme from "./theme/theme";

const Background = ( props ) => {
    return (
        <Box id="component">
            <Theme confetti={props.confetti}/>
        </Box>
    );
};

export default Background;
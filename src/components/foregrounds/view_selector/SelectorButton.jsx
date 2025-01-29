import React from "react";

import { Box, Center } from "@chakra-ui/react";

const SelectorButton = ( props ) => {
    return (
        <Box onClick={() => {props.setView(props.name);}}>
            <Center width={"25px"} fontSize={"25px"}>{props.icon}</Center>
        </Box>
    );
};

export default SelectorButton;
import React from "react";

import { Box, Center } from "@chakra-ui/react";

const SelectorButton = ( props ) => {
    return (
        <Box id="selector-button" onClick={() => {props.setView(props.name);}}>
            <Center width={"80px"} height={"45px"} fontSize={"25px"} cursor={"pointer"}>{props.icon}</Center>
        </Box>
    );
};

export default SelectorButton;
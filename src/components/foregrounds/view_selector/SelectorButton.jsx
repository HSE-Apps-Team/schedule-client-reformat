import React from "react";

import { Box, Center } from "@chakra-ui/react";

const SelectorButton = ( props ) => {
    const handleClick = () => {
        props.setView(props.name);
        props.setLoading(true);
    }
    return (
        <Box id="selector-button" onClick={handleClick}>
            <Center width={"80px"} height={"45px"} fontSize={"25px"} cursor={"pointer"}>{props.icon}</Center>
        </Box>
    );
};

export default SelectorButton;
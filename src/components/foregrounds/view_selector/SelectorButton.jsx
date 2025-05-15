import React from "react";

import { Box, Center } from "@chakra-ui/react";

const SelectorButton = ( props ) => {
    const handleClick = () => {
        props.setView(props.name);
        props.setLoading(true);
    }

    return (
        <Box className="inset-shadow" borderRadius={props.index === 0 ? "10px 0px 0px 10px" : props.index === 4 ? "0px 10px 10px 0px" : "0px"} bg={props.name === props.view ? "var(--accent-background)" : "var(--background-secondary)"} onClick={handleClick}>
            <Center width={"80px"} height={"100%"} fontSize={"20px"} cursor={"pointer"} padding={"10px"}>{props.icon}</Center>
        </Box>
    );
};

export default SelectorButton;
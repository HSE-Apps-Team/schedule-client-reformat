import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import ViewSelector from "./view_selector/ViewSelector";

const Foreground = ( props ) => {
    return (
        <Box>
            <Box height={"10vh"}>
                <Navbar />
            </Box>
            <Center position="absolute" top={"90vh"} width={"100%"}>
                <Box>
                    <ViewSelector setView={props.setView} width={"fit-content"}/>
                </Box>
            </Center>
        </Box>
    );
};

export default Foreground;
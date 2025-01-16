import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import ViewSelector from "./view_selector/ViewSelector";

const Foreground = () => {
    return (
        <Box>
            <Box>
                <Navbar/>
            </Box>
            <Box position="absolute" top={"90vh"}>
                <ViewSelector />
            </Box>
        </Box>
    );
};

export default Foreground;
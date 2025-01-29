import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import ViewSelector from "./view_selector/ViewSelector";

const Foreground = ( props ) => {
    return (
        <Box>
            <Box>
                <Navbar/>
            </Box>
            <Box position="absolute" top={"90vh"} width={"100%"}>
                <ViewSelector setView={props.setView}/>
            </Box>
        </Box>
    );
};

export default Foreground;
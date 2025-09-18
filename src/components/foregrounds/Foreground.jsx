import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import ViewSelector from "./view_selector/ViewSelector";
import Announcements from "./announcements/Announcements";

// the foreground layer. This allows things to dispay in front of everyhing else. Big w

// on the old app, you literally had to just guess z index values and hope you were right. It was crazy. This creates a good structure of everything, your welcome.

const Foreground = ( props ) => {
    return (
        <Box>
            <Announcements />
            <Box height={"10vh"} pointerEvents={"auto"}>
                <Navbar />
            </Box>
            <Center position="absolute" top={"90vh"} width={"100%"}>
                <Box pointerEvents={"auto"}>
                    <ViewSelector view={props.view} setView={props.setView} setLoading={props.setLoading} width={"fit-content"}/>
                </Box>
            </Center>
        </Box>
    );
};

export default Foreground;
import React from "react";
import { Box, Center } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import ViewSelector from "./view_selector/ViewSelector";
import Announcements from "./announcements/Announcements";

const Foreground = ( props ) => {
    return (
        <Box>
            <Announcements />
            <Box height={"10vh"}>
                <Navbar />
            </Box>
            <Center position="absolute" top={"90vh"} width={"100%"}>
                <Box>
                    <ViewSelector view={props.view} setView={props.setView} setLoading={props.setLoading} width={"fit-content"}/>
                </Box>
            </Center>
        </Box>
    );
};

export default Foreground;
import React from "react";

import { Box, Center } from "@chakra-ui/react";

import Calendar from "./calendar/calendar";
import Clock from "./clock/clock";
import Countdown from "./countdown/countdown";
import Settings from "./settings/settings"; // turn this back to lunch
import Schedule from "./schedule/schedule";

// if you want to add or change a view, you need to change its name in ViewSelector.jsx
const Views = ( props ) => {

    return (
        <Box height={"100vh"}>
            <Box height={"10%"} width={"100%"} />
            <Center height={"80%"} bg={"blue.300"}>
                {props.view === "clock" && <Clock />}
                {props.view === "countdown" && <Countdown view={props.view} />}
                {props.view === "calendar" && <Calendar />}
                {props.view === "schedule" && <Schedule />}
                {props.view === "settings" && <Settings />} 
            </Center>
            <Box height={"10%"} width={"100%"} />
        </Box>
    )
};

export default Views;
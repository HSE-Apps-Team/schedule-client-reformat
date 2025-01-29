import React from "react";

import { Box, Center } from "@chakra-ui/react";

import Calendar from "./calendar/Calendar";
import Clock from "./clock/Clock";
import Countdown from "./countdown/Countdown";
import Lunch from "./lunch/Lunch";
import Schedule from "./schedule/Schedule";

const Views = ( props ) => {

    return (
        <Box height={"100vh"}>
            <Box height={"10%"} width={"100%"} />
            <Center height={"80%"} bg={"blue.300"}>
                {props.view === "clock" && <Clock />}
                {props.view === "countdown" && <Countdown />}
                {props.view === "calendar" && <Calendar />}
                {props.view === "schedule" && <Schedule />}
                {props.view === "lunch" && <Lunch />}
            </Center>
            <Box height={"10%"} width={"100%"} />
        </Box>
    )
};

export default Views;
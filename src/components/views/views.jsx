import React from "react";

import { Box, Center } from "@chakra-ui/react";

import Calendar from "./calendar/Calendar";
import Clock from "./clock/Clock";
import Countdown from "./countdown/Countdown";
import Lunch from "./lunch/Lunch";
import Schedule from "./schedule/Schedule";

const Views = () => {

    const [view, setView] = React.useState("clock");

    return (
        <Box height={"100vh"}>
            <Box height={"10%"} width={"100%"} />
            <Center height={"80%"} bg={"blue.300"}>
                {view === "clock" && <Clock />}
                {view === "countdown" && <Countdown />}
                {view === "calendar" && <Calendar />}
                {view === "schedule" && <Schedule />}
                {view === "lunch" && <Lunch />}
            </Center>
            <Box height={"10%"} width={"100%"} />
        </Box>
    )
};

export default Views;
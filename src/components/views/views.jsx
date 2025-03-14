import React, { useState, useEffect } from "react";

import { Box, Center, CircularProgress } from "@chakra-ui/react";

import useMedia from "../../hooks/useMedia";

import Calendar from "./calendar/calendar";
import Clock from "./clock/clock";
import Countdown from "./countdown/countdown";
import Settings from "./settings/settings"; // turn this back to lunch
import Schedule from "./schedule/schedule";

// if you want to add or change a view, you need to change its name in ViewSelector.jsx
const Views = ( props ) => {
    const mobile = useMedia(
        ["(min-width: 750px)", "(max-width: 750px)"],
        [false, true]
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [props.view]);

    return (
        <Box height={"100vh"}>
            <Box height={"10%"} width={"100%"} />
                <Center height={"80%"}>
                    {loading && <CircularProgress isIndeterminate size={mobile ? window.innerWidth * 0.85 : window.innerHeight * 0.85} thickness={3.5} capIsRound={true} color="var(--color-primary)" trackColor="var(--background-secondary)"/>}
                    {props.view === "clock" && <Clock loading={loading} setLoading={setLoading}/>}
                    {props.view === "countdown" && <Countdown view={props.view} loading={loading} setLoading={setLoading} />}
                    {props.view === "calendar" && <Calendar loading={loading} setLoading={setLoading}/>}
                    {props.view === "schedule" && <Schedule loading={loading} setLoading={setLoading}/>}
                    {props.view === "settings" && <Settings loading={loading} setLoading={setLoading}/>}
                </Center>
            <Box height={"10%"} width={"100%"} />
        </Box>
    )
};

export default Views;
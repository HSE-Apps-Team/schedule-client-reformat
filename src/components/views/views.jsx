import React, { useState, useEffect } from "react";

import { Box, Center, CircularProgress } from "@chakra-ui/react";

import useMedia from "../../hooks/useMedia";

import Loading from "../graphics/loading/loading";

import Calendar from "./calendar/calendar";
import Clock from "./clock/clock";
import Countdown from "./countdown/countdown";
import Settings from "./settings/settings";
import Schedule from "./schedule/schedule";
import Lunch from "./lunch/lunch";

// if you want to add or change a view, you need to change its name in ViewSelector.jsx
const Views = ( props ) => {
    const mobile = useMedia(
        ["(min-width: 750px)", "(max-width: 750px)"],
        [false, true]
    );

    return (
        <Box height={"100vh"}>
            <Box height={"10%"} width={"100%"} />
                <Center height={"80%"}>
                    {/* {props.loading && <CircularProgress isIndeterminate size={mobile ? window.innerWidth * 0.85 : window.innerHeight * 0.85} thickness={3.5} capIsRound={true} color="var(--color-primary)" trackColor="var(--background-secondary)"/>} */}
                    {props.loading && <Loading loading={props.loading}/>}
                    {props.view === "clock" && <Clock loading={props.loading} setLoading={props.setLoading}/>}
                    {props.view === "countdown" && <Countdown view={props.view} loading={props.loading} setLoading={props.setLoading} />}
                    {props.view === "calendar" && <Calendar loading={props.loading} setLoading={props.setLoading}/>}
                    {props.view === "schedule" && <Schedule loading={props.loading} setLoading={props.setLoading}/>}
                    {props.view === "lunch" && <Lunch loading={props.loading} setLoading={props.setLoading}/>}
                </Center>
            <Box height={"10%"} width={"100%"} />
        </Box>
    )
};

export default Views;
import React from "react";

import { Box } from "@chakra-ui/react";

import SettingsButton from "./settingsButton/SettingsButton";
import Logo from "./logo/Logo";
import Weather from "./weather/Weather";

// creates the navbar. In the foreground. looks good imo

const Navbar = () => {
    return (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} height={"100%"} alignItems={"center"} padding={"10px"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} padding={"0px 10px"} width={"325px"}>
                <Logo />
                <Weather />
            </Box>
            <SettingsButton />
        </Box>
    );
};

export default Navbar;
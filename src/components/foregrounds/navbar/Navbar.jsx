import React from "react";

import { Box } from "@chakra-ui/react";

import SettingsButton from "./settingsButton/SettingsButton";
import Logo from "./logo/Logo";

const Navbar = () => {
    return (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
                <Logo />
            </Box>
            <Box>
                <SettingsButton />
            </Box>
        </Box>
    );
};

export default Navbar;
import React from "react";

import { Box } from "@chakra-ui/react";

import Settings from "./settings/Settings";
import Logo from "./logo/Logo";

const Navbar = () => {
    return (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
                <Logo />
            </Box>
            <Box>
                <Settings />
            </Box>
        </Box>
    );
};

export default Navbar;
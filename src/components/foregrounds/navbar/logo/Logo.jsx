import React from "react";

import { Box, Image, Text } from "@chakra-ui/react";

const Logo = () => {
    return (
        <a href="/">
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} href="https://hseschedule.app/">
                
                    <Image src="hseapps.png" width={"40px"}/>
                    <Text fontWeight={"550"} fontSize={"2xl"} paddingLeft={"10px"}>HSE Schedule</Text> 
            </Box>
        </a>
    );
};

export default Logo;
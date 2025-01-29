import React from "react";

import { Box } from "@chakra-ui/react";

import SelectorButton from "./SelectorButton";

const ViewSelector = ( props ) => {

    const icons = [<i class="bi bi-egg-fried" />, 
                   <i class="bi bi-list" />, 
                   <i class="bi bi-clock" />,
                   <i class="bi bi-hourglass-split" />,
                   <i class="bi bi-calendar" />];

    const names = ["settings","schedule", "clock", "countdown", "calendar"];

    const selectorButtons = names.map((name, index) => {
        return<SelectorButton name={name} icon={icons[index]} setView={props.setView} />;
    });

    return (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
            {selectorButtons}
        </Box>
    );
};

export default ViewSelector;
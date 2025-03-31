import React from "react";

import { Box } from "@chakra-ui/react";

import SelectorButton from "./SelectorButton";

const ViewSelector = ( props ) => {

    const icons = [<i className="bi bi-egg-fried"/>, 
                   <i className="bi bi-list" />, 
                   <i className="bi bi-clock" />,
                   <i className="bi bi-hourglass-split" />,
                   <i className="bi bi-calendar" />];

    const names = ["settings", "schedule", "clock", "countdown", "calendar"];

    const selectorButtons = names.map((name, index) => {
        return<SelectorButton name={name} icon={icons[index]} setView={props.setView} setLoading={props.setLoading} />;
    });

    return (
        <Box bg={"green"}id="selector-button" display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} borderRadius={"10px"} overflow={"hidden"}>
            {selectorButtons}
        </Box>
    );
};

export default ViewSelector;
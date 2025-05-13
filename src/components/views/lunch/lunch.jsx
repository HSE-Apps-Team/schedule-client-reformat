import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";

// PLACEHOLDER FOR LUNCH VIEW or any future view


const Lunch = ({ loading, setLoading }) => {
    useEffect(() => {
        setLoading(false);
    }, [ setLoading ]);
    setLoading(false);
    if (loading) {
        return null;
    }
    // Placeholder content for the Lunch view


    return (<Box>Lunch</Box>);
};

export default Lunch;
import {useEffect, useState} from "react";

import {Text, Box} from "@chakra-ui/react";

import {motion} from "framer-motion";
import { getIconForWeather } from "../../utilities/Weather";

const Forecast = ({period}) => {
    // Convert ISO timestamp to readable format
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <motion.div
            whileHover={{ x: 3 }}
        >
            <Box 
                bg={"var(--background-secondary)"} 
                borderColor="gray.200" 
                py={2} 
                margin={"4"} 
                borderRadius={"2xl"} 
                padding={"4"} 
                display={"flex"} 
                flexDirection={"row"}
                justifyContent={"space-around"}
                alignItems={"center"}
            >
                <Text fontWeight="bold">{formatTime(period.startTime)}</Text>
                <Text fontSize={"3xl"}><i className={`bi ${getIconForWeather(period.shortForecast, period.isDaytime)}`}></i></Text>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Text fontSize={"md"} color={"var(--text-secondary)"}>Temperature</Text>
                    <Text fontWeight="bold">{period.temperature}°</Text>

                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Text fontSize={"md"} color={"var(--text-secondary)"}>Rain Chance</Text>
                    <Text fontWeight="bold">{period.probabilityOfPrecipitation.value}%</Text>
                </Box>
            </Box>
        </motion.div>
    );

};

export default Forecast;

import {useState, useEffect} from "react";
import {Box, Text, Center} from "@chakra-ui/react";
import {motion} from "framer-motion";

import { getIconForWeather } from "../../utilities/Weather";

const CurrentWeather = ({weather}) => {
    return (
        <motion.div
            whileHover={{ x: 3 }}
        >
        <Box
            bg="var(--background-secondary)" 
            py={2} 
            margin={"4"}     
            borderRadius={"2xl"}
            padding={"4"} 
            display={"flex"} 
            alignItems="center" 
            justifyContent={"space-around"} 
            whileHover={{ x: 3 }}
        >
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">Now</Text>
            <Text fontSize="3xl"><i className={`bi ${getIconForWeather(weather.shortForecast, weather.isDaytime)}`}></i></Text>

            <Box display="grid" gridTemplateColumns="2fr 2fr" columnGap={2} rowGap={4} p="4" width="60%">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="md" color="var(--text-secondary)" textAlign="center">Temperature</Text>
                    <Text fontSize="xl" fontWeight="bold" textAlign="center">{weather.temperature}°</Text>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="md" color="var(--text-secondary)" textAlign="center">Condition</Text>
                    <Text textAlign="center">
                        {weather.shortForecast}
                        {/* Isolated Showers And Thunderstorms */}
                        {/* suny */}
                    </Text>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="md" color="var(--text-secondary)" textAlign="center">Wind Speed</Text>
                    <Text textAlign="center">{weather.windSpeed}</Text>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="md" color="var(--text-secondary)" textAlign="center">Rain Chance</Text>
                    <Text textAlign="center">{weather.probabilityOfPrecipitation.value}%</Text>
                </Box>
            </Box>
        </Box>
        </motion.div>
    );
};

export default CurrentWeather;
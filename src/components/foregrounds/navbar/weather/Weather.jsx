import { g, s } from "framer-motion/client";
import { getWeather } from "../../../../api/api";
import {Text, Box} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { getIconForWeather } from "../../../utilities/Weather";

// adds little temp and weather icon to the navbar. Just a little QoL addition.

const Weather = () => {
    const [weather, setWeather] = useState(null);



    const fetchWeatherData = () => {
        getWeather().then(response => {
            const data = response.data.properties.periods[0];

            const simple_weather = {
                temperature: data.temperature,
                icon: getIconForWeather(data.shortForecast, data.isDaytime)
            };

            setWeather(simple_weather);

        });
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    return (
        <>
            {weather ? (
                <Box 
                    display={"flex"} 
                    flexDirection={"row"} 
                    alignItems={"center"} 
                    justifyContent={"space-around"} 
                    bg={"var(--background-secondary)"} 
                    borderRadius={"xl"}
                    padding={"6px 6px"}
                >
                    <Text fontSize={"large"} padding={"0 6px"}>{weather.temperature}°</Text>
                    <Text fontSize={"large"} padding={"0 6px"}><i className={`bi ${weather.icon}`}></i></Text>
                </Box>
            ) : (
                <Text>Loading...</Text>
            )}
        </>
    );
};

export default Weather;
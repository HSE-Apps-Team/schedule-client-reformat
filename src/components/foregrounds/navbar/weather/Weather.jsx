import { g, s } from "framer-motion/client";
import { getWeather } from "../../../../api/api";
import {Text, Box} from "@chakra-ui/react";

import { useEffect, useState } from "react";

const Weather = () => {
    const [weather, setWeather] = useState(null);

    const getIconForWeather = (shortForecast, isDaytime) => {
        const forecast = shortForecast.toLowerCase();

        // Prioritize specific, severe weather conditions
        if (forecast.includes("tornado")) {
            return "bi-tornado";
        }
        if (forecast.includes("hurricane") || forecast.includes("tropical storm")) {
            return "bi-hurricane";
        }
        if (forecast.includes("thunderstorm") || forecast.includes("thunder")) {
            return "bi-cloud-lightning-rain-fill";
        }
        if (forecast.includes("snow")) {
            return "bi-cloud-snow-fill";
        }
        if (forecast.includes("sleet")) {
            return "bi-cloud-sleet-fill";
        }
        if (forecast.includes("hail")) {
            return "bi-cloud-hail-fill";
        }
        if (forecast.includes("rain") || forecast.includes("showers")) {
            return "bi-cloud-rain-fill";
        }
        if (forecast.includes("drizzle")) {
            return "bi-cloud-drizzle-fill";
        }
        if (forecast.includes("fog") || forecast.includes("haze")) {
            return "bi-cloud-fog-fill";
        }
        if (forecast.includes("windy")) {
            return "bi-wind";
        }
        
        // Handle cloud cover based on day or night
        if (forecast.includes("partly sunny") || forecast.includes("partly cloudy")) {
            return isDaytime ? "bi-cloud-sun-fill" : "bi-cloud-moon-fill";
        }
        if (forecast.includes("mostly sunny") || forecast.includes("mostly cloudy")) {
            return isDaytime ? "bi-cloud-sun-fill" : "bi-cloud-moon-fill";
        }
        if (forecast.includes("cloudy") || forecast.includes("overcast")) {
            return isDaytime ? "bi-cloudy-fill" : "bi-cloudy-fill";
        }
        if (forecast.includes("sunny") || forecast.includes("clear") || forecast.includes("fair")) {
            return isDaytime ? "bi-sun-fill" : "bi-moon-fill";
        }

        // Default fallback icon if no condition is matched
        return "bi-cloud-fill";
        };


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
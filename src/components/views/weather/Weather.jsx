import {getWeather} from "../../../api/api";
import { useState, useEffect } from 'react'
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

import {Box, Text} from "@chakra-ui/react"

// Weather component displays current weather and forecast
// It fetches weather data from the API and manages loading and error states
// i think it is good, but could use some improvements

const Weather = ({loading, setLoading}) => {
    // Weather component logic

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

     const fetchWeatherData = () => {
            getWeather()
                .then(response => {
                    console.log('Full weather response:', response.data);
                    const data = response.data.properties?.periods;
                    setWeather(data);
                    setLoading(false);
                    setIsLoading(false);
                    console.log('Weather periods:', data);
                    console.log('First period:', data?.[0]);
                })
                .catch(err => {
                    console.error('Weather API error:', err);
                    setError('Failed to load weather data');
                    setLoading(false);
                    setIsLoading(false);
                });
        };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    // Don't render content while still loading
    if (isLoading) {
        return null; // Let Views component handle loading display
    }

    if (error) {
        return (
            <Box height={"100%"} display="flex" alignItems="center" justifyContent="center">
                <Text color="red.500" textAlign="center">
                    {error}
                </Text>
            </Box>
        );
    }

    return (
        <Box 
            height={"100%"} 
            overflowY={"auto"} 
            width={"40%"}
            minWidth={"400px"}
            sx={{
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',  // IE and Edge
                scrollbarWidth: 'none',   // Firefox
            }}
        >
            {weather && weather.length > 0 ? (
                <>
                    <CurrentWeather weather={weather[0]} />
                    <ul>
                        {weather.slice(1, 6).map((period) => (
                            <Forecast key={period.id} period={period} />
                        ))}
                    </ul>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text>No weather data available (weather: {weather ? 'exists but empty' : 'null'})</Text>
                </Box>
            )}
        </Box>
    )

};

export default Weather;
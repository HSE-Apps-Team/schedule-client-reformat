import {getWeather} from '../../../api/api';
import React, { useEffect, useState } from "react";

import Snowfall from 'react-snowfall';
import ReactRain from 'react-rain-animation';

import 'react-rain-animation/lib/style.css';

import { Box } from "@chakra-ui/react";

const Weather = () => {
    const [weather, setWeather] = useState(null);

    const fetchFakeWeatherData = () => {
        // Mock weather data

        getWeather().then(response => {
            try {
                const data = response.data.properties.periods[0];

                const simple_weather = {temperature: data.temperature}

                const shortForecast = data.shortForecast.toLowerCase();
                if (shortForecast.includes("thunder") || shortForecast.includes("t-storm")) {
                    simple_weather.condition = "thunder"; // ⛈️
                } else if (shortForecast.includes("blizzard") || shortForecast.includes("snow") || shortForecast.includes("flurry")) {
                    simple_weather.condition = "snow"; // ❄️
                } else if (shortForecast.includes("sleet") || shortForecast.includes("ice pellets")) {
                    simple_weather.condition = "sleet"; // 🧊
                } else if (shortForecast.includes("rain") || shortForecast.includes("shower") || shortForecast.includes("drizzle")) {
                    simple_weather.condition = "rain"; // 🌧️
                } else if (shortForecast.includes("cloudy")) {
                    simple_weather.condition = "cloudy"; // ☁️
                } else if (shortForecast.includes("sunny") || shortForecast.includes("clear")) {
                    simple_weather.condition = "clear"; // ☀️
                } else {
                    // This is the fallback for any unanticipated forecast string.
                    simple_weather.condition = "unknown"; // ❓
                }

                setWeather(simple_weather);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        });

        // Randomly select a weather condition
        // const mockWeather = mockWeatherOptions[Math.floor(Math.random() * mockWeatherOptions.length)];
        
        
        // Set the mock data to state
        // setWeather({
        //     condition: 'sleet', // mockWeather.condition,
        //     temperature: -5 // mockWeather.temperature
        // });
        
        // In the future, replace with actual API call:
        // api.getWeather().then(data => setWeather(data)).catch(err => console.error('Error fetching weather:', err));
    };
    useEffect(() => {

        fetchFakeWeatherData();
    }, []);
        // You can also add a refresh interval if needed
        // const interval = setInterval(fetchFakeWeatherData, 600000); // every 10 minutes
        // return () => clearInterval(interval);
    if (!weather) {
        console.log("Weather data is not available yet.");
        return null; // or a loading spinner
    }
    console.log("Weather data:", weather);
    return (
        <Box height="100vh" width="100vw" position="fixed" top="0" left="0" pointerEvents="none">
            {weather.condition === 'snow' && <Snowfall color="white" snowflakeCount={200} />}
            {weather.condition === 'rain' && <ReactRain numDrops={100} />}
            {weather.condition === 'sleet' && <ReactRain numDrops={100} rainColor="white" />}
        </Box>
    );
}

export default Weather;
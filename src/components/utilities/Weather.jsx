export const getIconForWeather = (shortForecast, isDaytime) => {
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

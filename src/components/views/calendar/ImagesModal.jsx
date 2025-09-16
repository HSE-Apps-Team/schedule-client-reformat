import React, { useEffect, useState } from "react";
import { Box, Text, Button, Link, VStack } from "@chakra-ui/react";
import { getCalendar2 } from "../../../api/api.js";// Assuming this fetches the data from the API
import useMedia from "../../../hooks/useMedia.js";

// Get API URL from environment
const apiUrl = process.env.REACT_APP_API_URL;


// According to Nic, the designing is very annoying. 
// This way made to specifcally fit allowing new calendars 
// ontop of previous functionality of just displaying one image calendar. 

// This is going through HSE Admin and HSE Schedule API, so make sure changes are good for everything. 

// This is was changed from the original view so that there can be multiple calendars or views.

const CalendarSelector = ({ loading, setLoading }) => {
      
    const [calendars, setCalendars] = useState([]);
    // No need for selectedCalendarIndex or tab state

    // Async function to fetch calendars
    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const response = await getCalendar2();

                console.log("API Response:", response); // Log the full response to inspect it

                // Access the data array from the response object
                const data = response.data; // This should contain the actual array of calendars

                // Ensure the response contains an array in the `data` property
                if (Array.isArray(data)) {
                    setCalendars(data);
                    setLoading(false);
                } else {
                    console.error("Expected an array inside the response data but received:", data);
                }
            } catch (error) {
                console.error("Error fetching calendars:", error);
            }
        };

        fetchCalendars();
    }, []);

    useEffect(() => {
        console.log("Calendars state:", calendars); // Log the calendars state whenever it changes
    }, [calendars]);

    if (loading) {
        return null;
    }

    return (
        <Box width={"90%"} margin={"auto"} overflowY={"scroll"}
            sx={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                mozScrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
            <Text fontSize="xl" mb={4} fontWeight="bold" textAlign="center">Available Calendars</Text>
            <VStack spacing={4} align="stretch">
                {calendars.length === 0 && (
                    <Text textAlign="center">No calendars available.</Text>
                )}
                {calendars.map((calendar) => (
                    <Box key={calendar._id} p={4} bg="var(--accent-background)" borderRadius="10px" boxShadow="md" display="flex" alignItems="center" justifyContent="space-between">
                        <Text fontWeight="semibold">{calendar.name}</Text>
                        <Link
                            href={`${apiUrl}/announcements/calendar2/${calendar._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            _hover={{ textDecoration: "none" }}
                        >
                            <Button variant="outline">
                                Open in New Tab
                            </Button>
                        </Link>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default CalendarSelector;

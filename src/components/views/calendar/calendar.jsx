import React, { useEffect, useState } from "react";
import { Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Image } from "@chakra-ui/react";
import { getCalendar2 } from "../../../api/api.js";// Assuming this fetches the data from the API
import useMedia from "../../../hooks/useMedia.js";

const CalendarSelector = () => {
    const mobile = useMedia(
        ["(min-width: 750px)", "(max-width: 750px)"],
        [false, true]
    );
      
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(0); // Keep track of the active tab index

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

    return (
        <Box width={ mobile ? "90%" : "50%" } margin={"auto"} overflowY={"scroll"} height={"85vh"}
        sx={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            mozScrollbarWidth: 'none',
            '&::-webkit-scrollbar': { // Hide scrollbar on WebKit-based browsers
              display: 'none'
            }
        }}>
            <Tabs 
                isLazy 
                variant="unstyled" 
                index={selectedCalendarIndex}
                onChange={(index) => setSelectedCalendarIndex(index)} // Update active tab when a tab is clicked

            >
                <TabList>
                    {/* Dynamically generate tabs using _id as the tab name */}
                    {calendars.map((calendar, index) => (
                        <>
                            <Tab
                                key={calendar._id}
                                className={selectedCalendarIndex === index ? "component selected" : "component"}
                                borderColor={"none"}
                                borderRadius={"10px 10px 0 0"}
                                sx={{ // I have absolutely no clue how pseudo elements work
                                      // but this adds extra background below the tabs
                                      // the top right of the border radius is able to fill in when the tabs extend all the way
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        display: 'block',
                                        height: '10px',
                                        backgroundColor: selectedCalendarIndex === index ? 'bg-muted' : 'bg-box',
                                        position: 'absolute',
                                        bottom: '-10px',
                                        left: 0,
                                        width: '100%',
                                    }
                                }}
                            >
                                {calendar.name} {/* Tab label is the calendar's _id */}
                            </Tab>
                        </>
                    ))}
                </TabList>

                <TabPanels className="component selected" position={"relative"} zIndex={1} borderRadius={"0 10px 10px 10px"}>
                    {/* Dynamically generate tab panels with corresponding imgUrl */}
                    {calendars.map((calendar) => (
                        <TabPanel key={calendar._id} >
                            <Image 
                                src={calendar.imgUrl} 
                                alt={`Calendar ${calendar._id}`} 
                                width="100%" 
                                borderRadius="10px 10px 10px 10px"
                            />
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default CalendarSelector;

import {Text, Box} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import { getEvents2, getEventTypes } from "../../../api/api";
import EventKey from "./EventKey";

const CalendarSidebar = ({ daySelected}) => {
    const [events, setEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);

    // Fetch event types once
    useEffect(() => {
        getEventTypes()
            .then(res => {
                setEventTypes(res.data);
            })
            .catch(() => setEventTypes([]));
    }, []);

    useEffect(() => {
        if (!daySelected) return;
        const start = daySelected instanceof Date ? daySelected.toISOString().slice(0, 10) : String(daySelected);
        const end = start;
        getEvents2(start, end)
            .then(res => {
                setEvents(res.data);
            })
            .catch(() => setEvents([]));
    }, [daySelected]);

    // Utility to lighten color
    function lightenColor(color, percent) {
        // Accepts hex color, returns lighter hex
        let num = parseInt(color.replace('#',''),16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R<255?R<1?0:R:255)*0x10000 +
            (G<255?G<1?0:G:255)*0x100 +
            (B<255?B<1?0:B:255)
        ).toString(16).slice(1);
    }

    // Get color for event type by name
    function getTypeColorByName(typeName) {
        const type = eventTypes.find(t => t.name === typeName);
        return type?.color || '#888';
    }

    return (
        <>
            {daySelected && (
                <Box height={"100%"} bg={"var(--background-secondary)"} p={4} borderRadius={10} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                    <Box>
                        <Text fontSize={"lg"} p={2}>Events on {daySelected instanceof Date ? daySelected.toLocaleDateString() : String(daySelected)}</Text>
                        {events.length === 0 ? (
                            <Text p={2}>Nothing is going on at HSE</Text>
                        ) : (
                            events.map((event, idx) => {
                                const color = getTypeColorByName(event.eventType);
                                return (
                                    <Box
                                        key={event._id?.$oid || event._id || idx}
                                        mb={2}
                                        p={2}
                                        borderRadius={10}
                                        borderLeft={`8px solid ${color}`}
                                        bgColor="var(--accent-background)"
                                    >
                                        <Text fontSize={"lg"} p={2}>{event.title || "Untitled Event"}</Text>
                                        {event.description && <Text fontSize="md" p={2}>{event.description}</Text>}
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                    <EventKey />
                </Box>
            )}
        </>
    );
};

export default CalendarSidebar;
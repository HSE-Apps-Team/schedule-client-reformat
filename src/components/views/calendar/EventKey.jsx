import {Text, Box} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import { getEventTypes } from "../../../api/api";

const EventKey = () => {
    const [eventTypes, setEventTypes] = useState([]);

    useEffect(() => {
        getEventTypes()
            .then(res => setEventTypes(res.data))
            .catch(() => setEventTypes([]));
    }, []);

    return (
        <Box 
            p={4} 
            borderRadius={10} 
            // bgColor="var(--background-secondary)"
            >
            <Text fontSize={"lg"} mb={2}>Event Types</Text>
            {eventTypes.length === 0 ? (
                <Text>No event types found.</Text>
            ) : (
                eventTypes.map(type => (
                    <Box key={type._id} display="flex" alignItems="center" mb={2}>
                        <Box width="12px" height="12px" borderRadius="full" bgColor={type.color} mr={2} />
                        <Text fontSize={"md"}>{type.name}</Text>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default EventKey;
import {Box, Text} from "@chakra-ui/react";
import { useDeviceType} from "../../../../hooks/useDeviceType";

const CalendarDay = ({ date, isSelected, onClick, children, style, dayColor, eventColors = [] }) => {
    const { deviceType } = useDeviceType();

    console.log("Current device type:", deviceType);

    return (
        <Box
            p={2}
            width={ deviceType == 0 ? "20" : "16"}
            height={ deviceType == 0 ? "20" : "16"}
            borderBottom={`10px solid ${dayColor}`}
            textAlign="center"
            bg={isSelected ? "var(--accent-background)" : "var(--background-secondary)"}
            borderRadius="md"
            cursor="pointer"
            onClick={onClick}
            style={style}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin={1}
        >
            {/* Event dots at the top, left-aligned */}
            {eventColors && eventColors.length > 0 && (
                <Box display="flex" width="100%" justifyContent="flex-start" mb={1} gap={1}>
                    {eventColors.map((color, idx) => (
                        <Box
                            key={idx}
                            width="8px"
                            height="8px"
                            borderRadius="50%"
                            bg={color}
                        />
                    ))}
                </Box>
            )}
            <Text fontSize="lg">{children}</Text>
        </Box>
    );
};

export default CalendarDay;

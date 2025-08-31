import {Box, Text} from "@chakra-ui/react";

const CalendarDay = ({ date, isSelected, onClick, children, style, dayColor, eventColors = [] }) => {
    return (
        <Box
            p={2}
            minWidth={"20"}
            minHeight={"20"}
            borderBottom={`10px solid ${dayColor}`}
            textAlign="center"
            bg={isSelected ? "var(--accent-background)" : "var(--background-primary)"}
            borderRadius="md"
            cursor="pointer"
            onClick={onClick}
            style={style}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
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
            <Text fontSize="xl">{children}</Text>
        </Box>
    );
};

export default CalendarDay;

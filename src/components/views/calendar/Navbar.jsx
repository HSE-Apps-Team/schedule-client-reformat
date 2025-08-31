import {Text, Box} from "@chakra-ui/react";

const CalendarNavbar = ({ month, setMonth }) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
        <Box>
            <Box display={"flex"} flexDirection="row" alignItems="center" justifyContent={"center"} p={4}>
                <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={"3"}>
                    <button 
                        onClick={() => setMonth(prev => prev - 1)}
                        style={{ 
                            fontSize: '1.2rem', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer' 
                        }}
                        >
                        &larr;
                    </button>
                        <Text fontSize={"3xl"}>{monthNames[month]}</Text>
                    <button 
                        onClick={() => setMonth(prev => prev + 1)}
                        style={{ 
                            fontSize: '1.2rem', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer' 
                        }}
                    >
                        &rarr;
                    </button>
                </Box>
            </Box>
        </Box>
    );
};

export default CalendarNavbar;
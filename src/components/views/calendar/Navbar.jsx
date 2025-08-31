import {Text, Box, Button, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton} from "@chakra-ui/react";
import { useState } from "react";
import CalendarSelector from "./Images";

const CalendarNavbar = ({ month, setMonth }) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
            {/* Left: Empty or for future use */}
            <Box width="80px" />
            {/* Center: Month navigation */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={2} gap={"3"}>
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
                <Text fontSize={"3xl"} textAlign="center" minWidth="120px">{monthNames[month]}</Text>
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
            {/* Right: Button */}
            <Box>
                <Button onClick={() => setIsOpen(true)}>
                    Official
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                    <ModalContent width="80vw" maxWidth="80vw">
                    <ModalHeader>Official</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CalendarSelector />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CalendarNavbar;
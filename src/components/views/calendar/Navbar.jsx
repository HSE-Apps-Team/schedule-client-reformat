import {Text, Box, Button, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton} from "@chakra-ui/react";
import { useState } from "react";
import CalendarSelector from "./ImagesModal";
import { useDeviceType } from "../../../hooks/useDeviceType";

const CalendarNavbar = ({ month, setMonth }) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [isOpen, setIsOpen] = useState(false);
    const { deviceType } = useDeviceType();



    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" bg={"var(--background-secondary)"} borderRadius={"lg"} p={3}>
            {/* Left: Empty or for future use */}
            <Box width="80px"> 
                {/* <Text fontSize={"md"}>In Beta!</Text>  */}
            
            </Box>
            {/* Center: Month navigation */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
                <Button 
                    onClick={() => setMonth(prev => prev - 1)}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                    color={"var(--text-primary)"}
                    fontSize={deviceType !== 2 ? "3xl" : "xl"}
                >
                    &larr;
                </Button>
                <Text fontSize={deviceType !== 2 ? "3xl" : "xl"} textAlign="center" minWidth="120px">{monthNames[Math.abs(month%12)]}</Text>
                <Button 
                    onClick={() => setMonth(prev => prev + 1)}
                    style={{
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                    color={"var(--text-primary)"}
                    fontSize={deviceType !== 2 ? "3xl" : "xl"}
                >
                    &rarr;
                </Button>
            </Box>
            {/* Right: Button */}
            <Box>
                <Button onClick={() => setIsOpen(true)} size={"sm"}>
                    Official
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                    <ModalContent width="80vw" maxWidth="600px">
                    <ModalHeader>Official Calendars</ModalHeader>
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
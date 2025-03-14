import React from "react";

import { Box, Button, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

const SettingsButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button id="button" onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Settings
                </ModalBody>

                <ModalFooter>
                    <Button id="button" mr={3} onClick={onClose}>
                    Close
                    </Button>
            
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SettingsButton;
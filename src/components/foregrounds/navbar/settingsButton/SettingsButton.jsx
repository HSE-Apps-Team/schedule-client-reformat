import React from "react";

import { Box, Button, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, useDisclosure, IconButton } from "@chakra-ui/react";

import Settings from "../../../views/settings/settings.jsx"

const SettingsButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton id="button" onClick={onOpen} isRound="True"><i className="bi bi-gear"/></IconButton>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"var(--background-secondary)"} className="shadow">
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Settings/>
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
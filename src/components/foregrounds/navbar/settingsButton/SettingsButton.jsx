import React from "react";

import { Box, Button, Modal, ModalBody, ModalOverlay, ModalContent, Text, ModalHeader, ModalFooter, ModalCloseButton, useDisclosure, IconButton } from "@chakra-ui/react";

import Settings from "../../../views/settings/settings.jsx"

// creates the settings button for the navbar

// also includes links for modal

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

                    <ModalFooter display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} px={"8"}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} width={"20%"} color={"var(--color-primary)"}>
                                <a href="https://github.com/HSE-Apps-Team/schedule-client-reformat" target="_blank">
                                    <i className="bi bi-github fs-4" style={{ fontSize: "1.5rem" }}></i>
                                </a>
                                <a href="https://cs.hseapps.org" target="_blank">
                                    <i className="bi bi-pc-display"  style={{ fontSize: "1.5rem" }}></i>
                                </a>
                            </Box>
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
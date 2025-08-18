import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getAnnouncements } from "../../../api/api";

// creates the announcements component, which displays important messages to the user, from the admin app. Idk how this works ngl, but it works.

const Announcements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getAnnouncements().then((res) => {
      console.log(res.data);
      if (
        localStorage.getItem("announcement") !== res.data._id &&
        res.data._id
      ) {
        if (res.data) {
          setMessage(res.data);
          onOpen();
          localStorage.setItem("announcement", res.data._id);
        }
      }
    });
  }, []);

  if (message) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{message.Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 style={{ whiteSpace: "pre-line" }}> {message.Content}</h1>
            <br></br>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  return null;
};

export default Announcements;
